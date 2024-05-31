import { Schema, model } from 'mongoose';
import {
  AcademicDepartmentModel,
  IacademicDepartment,
} from './academicDepartment.interface';

const AcademicDepartmentSchema = new Schema<
  IacademicDepartment,
  AcademicDepartmentModel
>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'academicFaculty',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const AcademicDepartment = model<
  IacademicDepartment,
  AcademicDepartmentModel
>('AcademicDepartment', AcademicDepartmentSchema);
