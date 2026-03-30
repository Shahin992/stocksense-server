import { Schema, model } from 'mongoose';
import { IUser } from './user.interface';
import bcrypt from 'bcryptjs';

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ['admin', 'manager', 'user'], default: 'user' },
  },
  { timestamps: true }
);

UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password as string, 10);
});

export const User = model<IUser>('User', UserSchema);
