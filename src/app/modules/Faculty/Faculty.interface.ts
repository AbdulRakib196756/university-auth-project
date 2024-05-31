import { Model, Types } from 'mongoose';
import { Iacademicfaculty } from '../academicFaculty/academicFaculty.interface';
import { IacademicDepartment } from '../academicDepartment/academicDepartment.interface';

type Ifacultyname = {
  firstname: string;
  middlename?: string;
  lastname: string;
};

export type Ifaculty = {
  id: string;
  name: Ifacultyname;
  dateofbirth: string;
  gender: 'male' | 'female';
  email: string;
  designation: string;
  academicDepartment: Types.ObjectId | IacademicDepartment;
  academicFaculty: Types.ObjectId | Iacademicfaculty;

  profileImage?: string;
};

export type Facultymodel = Model<Ifaculty, Record<string, unknown>>;

export type Ifacultyfilters = {
  searchTerm?: string;
  academicFaculty?: string;
  academicDepartment?: string;
  designation?: string;
  email?: string;
};
