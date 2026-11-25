import mongoose, { Schema } from 'mongoose';
import { genderEnum, providerEnum, roleEnum } from '../../Utils/Enums/user.enum.js';

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First Name is Mandatory'],
      minLenght: 2,
      maxLenght: 25,
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Last Name is Mandatory'],
      minLenght: 2,
      maxLenght: 25,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is mandatory'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    DOB: Date,
    age: Number,
    phone: String,
    gender: {
      type: Number,
      enum: Object.values(genderEnum),
      default: genderEnum.MALE,
    },
    role: {
      type: Number,
      enum: Object.values(roleEnum),
      default: roleEnum.ADMIN,
    },
    provider: {
      type: Number,
      enum: Object.values(providerEnum),
      default: providerEnum.SYSTEM,
    },
    confirmEmail: Date,
    profilePic: String,
    coverPic: [String],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
userSchema
  .virtual('username')
  .set(function (value) {
    const [firstName, lastName] = value.split(' ');
    this.set({
      firstName,
      lastName,
    });
  })
  .get(function () {
    return `${this.firstName} ${this.lastName}`;
  });

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
