import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import catchAsync from '../utils/catchAsync';
import { User } from '../modules/user/user.model';

const auth = (...requiredRoles: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new Error('You are not authorized');
    }

    // Verify JWT
    const decoded = jwt.verify(token, config.jwt_secret as string) as JwtPayload;
    
    // Check if User exists in Database (Critical Security Check)
    const user = await User.findOne({ email: decoded.email });
    
    if (!user) {
      throw new Error('This user is not found!');
    }

    // Check Role
    if (requiredRoles.length && !requiredRoles.includes(user.role)) {
      throw new Error('Forbidden Access: You do not have permission.');
    }

    req.user = user;
    next();
  });
};

export default auth;
