import { Model, Types } from 'mongoose';
import { Imanagement } from '../management-department/managment.interface';

export type Iadminname = {
  firstname: string;
  midlename?: string;
  lastname: string;
};

export type IAdmin = {
  id: string;
  name: Iadminname;
  dateofbirth: string;
  gender: 'male' | 'female';
  email: string;
  managementdepartment: Types.ObjectId | Imanagement;
  designation: string;
  profileimage?: string;
};

export type adminmodel = Model<IAdmin, Record<string, unknown>>;

export type Iadminfiltarablefeild = {
  searchTerm?: string;
  designation?: string;
  managementdepartment?: string;
  email?: string;
};
