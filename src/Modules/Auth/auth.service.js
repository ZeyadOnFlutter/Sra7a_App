import * as dbService from '../../DB/database.repository.js';
import UserModel from '../../DB/Models/user.mode.js';
import { hashEnum } from '../../Utils/Enums/security.enum.js';
import { ConflictException, NotFoundException } from '../../Utils/Response/error.response.js';
import successResponse from '../../Utils/Response/success.response.js';
import { decrypt, encrypt } from '../../Utils/Security/encryption.security.js';
import { compareHash, generateHash } from '../../Utils/Security/hash.security.js';

export const signup = async (req, res) => {
  const { username, email, password, phone, gender, role, DOB } = req.body;

  const user = await dbService.findOne({ model: UserModel, filter: { email } });
  if (user) throw ConflictException({ message: 'User Already Exists' });
  const hashedPassword = await generateHash({ plainText: password, algorithm: hashEnum.Bcrypt });
  const encryptedPhone = encrypt(phone);
  const createdUser = await dbService.create({
    model: UserModel,
    data: [{ username, email, password: hashedPassword, phone: encryptedPhone, gender, role, DOB }],
  });
  successResponse({
    res,
    statusCode: 201,
    data: { createdUser },
    message: 'User Created Successfully',
  });
};
export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await dbService.findOne({ model: UserModel, filter: { email } });
  if (!user) throw NotFoundException({ message: 'User Not Found' });
  const isMatch = await compareHash({
    plainText: password,
    cypherText: user.password,
    algorithm: hashEnum.Bcrypt,
  });
  if (!isMatch) throw NotFoundException({ message: 'Invalid Credentials' });
  if (user.phone) user.phone = decrypt(user.phone);
  successResponse({
    res,
    data: { user },
  });
};
