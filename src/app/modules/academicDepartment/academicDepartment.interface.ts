import { Model, Types } from 'mongoose';
import { Iacademicfaculty } from '../academicFaculty/academicFaculty.interface';

export type IacademicDepartment = {
  title: string;
  academicFaculty: Types.ObjectId | Iacademicfaculty;
};

export type AcademicDepartmentModel = Model<
  IacademicDepartment,
  Record<string, unknown>
>;

export type IAcademicDepartmentFilters = {
  searchTerm?: string;
  academicFaculty?: Types.ObjectId;
};
