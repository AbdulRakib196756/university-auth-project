import { Schema, model } from 'mongoose';
import { Istudent, StudentModel } from './student.interface';

export const studentSchema = new Schema<Istudent, StudentModel>(
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
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'academicFaculty',
      required: true,
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
      required: true,
    },
    academicSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
      required: true,
    },

    profileimage: {
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

export const Student = model<Istudent, StudentModel>('Student', studentSchema);
