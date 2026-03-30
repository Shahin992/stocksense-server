import { User } from '../user/user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../../config';

const loginUser = async (payload: any) => {
  const user = await User.findOne({ email: payload.email }).select('+password');

  if (!user) {
    throw new Error('User not found');
  }

  const isPasswordMatched = await bcrypt.compare(payload.password, user.password as string);

  if (!isPasswordMatched) {
    throw new Error('Password does not match');
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_secret as string, {
    expiresIn: config.jwt_expires_in as jwt.SignOptions['expiresIn'],
  });

  return {
    accessToken,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

export const AuthService = {
  loginUser,
};
