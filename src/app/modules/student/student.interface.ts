import { Model, Types } from 'mongoose';

import { Iacademicfaculty } from '../academicFaculty/academicFaculty.interface';
import { IacademicDepartment } from '../academicDepartment/academicDepartment.interface';
import { IAcademicSemester } from '../academicSemester/academicSemester.interface';

export type Istudentname = {
  firstname: string;
  midlename?: string;
  lastname: string;
};

export type Istudent = {
  id: string;
  name: Istudentname;
  dateofbirth: string;
  gender: 'male' | 'female';
  email: string;
  academicFaculty: Types.ObjectId | Iacademicfaculty;
  academicDepartment: Types.ObjectId | IacademicDepartment;
  academicSemester: Types.ObjectId | IAcademicSemester;
  profileimage?: string;
};

export type StudentModel = Model<Istudent, Record<string, unknown>>;
export type Istudentfilters = {
  searchTerm?: string;
  academicFaculty?: string;
  academicDepartment?: string;
  academicSemester?: string;
  email?: string;
};
