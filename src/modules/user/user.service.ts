import { IUser } from './user.interface';
import { User } from './user.model';

const createUser = async (payload: IUser): Promise<any> => {
  const result = await User.create(payload);
  const user = result.toObject();
  delete user.password;
  return user;
};

export const UserService = {
  createUser,
};
