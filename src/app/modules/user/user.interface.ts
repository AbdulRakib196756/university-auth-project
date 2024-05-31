import { Model, Types } from 'mongoose';
import { Istudent } from '../student/student.interface';
import { Ifaculty } from '../Faculty/Faculty.interface';
import { IAdmin } from '../Admin/admin.interface';

export type IUser = {
  id: string;
  role: string;
  password: string;
  student?: Types.ObjectId | Istudent;
  faculty?: Types.ObjectId | Ifaculty;
  admin?: Types.ObjectId | IAdmin;
};

export type UserModel = Model<IUser, Record<string, unknown>>;
