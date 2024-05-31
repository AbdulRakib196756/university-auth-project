import { Schema, model } from 'mongoose';
import { Facultymodel, Ifaculty } from './Faculty.interface';

const Facultyschema = new Schema<Ifaculty, Facultymodel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      firstname: {
        type: String,
        required: true,
      },
      middlename: {
        type: String,
      },
      lastname: {
        type: String,
        required: true,
      },
    },
    dateofbirth: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
    },
    email: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
      required: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'academicFaculty',
      required: true,
    },
    profileImage: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const Faculty = model<Ifaculty, Facultymodel>('Faculty', Facultyschema);
