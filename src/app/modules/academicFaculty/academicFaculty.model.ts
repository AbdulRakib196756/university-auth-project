import { Schema, model } from 'mongoose';
import {
  Iacademicfaculty,
  IacademicfacultyModel,
} from './academicFaculty.interface';

const IacademicFacultySchema = new Schema<
  Iacademicfaculty,
  IacademicfacultyModel
>(
  {
    title: {
      type: String,
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

export const academicFaculty = model<Iacademicfaculty, IacademicfacultyModel>(
  'academicFaculty',
  IacademicFacultySchema,
);
