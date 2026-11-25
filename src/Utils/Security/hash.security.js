import { compare, hash } from 'bcrypt';
import { SALT_ROUND } from '../../../Config/config.service.js';
import { hashEnum } from '../Enums/security.enum.js';
import * as argon2 from 'argon2';
import { BadRequestException } from '../Response/error.response.js';

export const generateHash = async ({
  plainText,
  saltRounds = Number(SALT_ROUND),
  algorithm = hashEnum.Bcrypt,
}) => {
  let hashResult = '';

  switch (algorithm) {
    case hashEnum.Bcrypt:
      hashResult = await hash(plainText, saltRounds);
      break;
    case hashEnum.Argon2:
      hashResult = await argon2.hash(plainText);
      break;

    default:
      throw BadRequestException({ message: 'Invalid hash algorithm specified' });
  }
  return hashResult;
};
export const compareHash = async ({ plainText, cypherText, algorithm = hashEnum.Bcrypt }) => {
  let match = false;

  switch (algorithm) {
    case hashEnum.Bcrypt:
      match = await compare(plainText, cypherText);
      break;
    case hashEnum.Argon2:
      match = await argon2.verify(cypherText, plainText);
      break;

    default:
      throw BadRequestException({ message: 'Invalid hash algorithm specified' });
  }
  return match;
};
