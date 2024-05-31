import { Schema, model } from 'mongoose';
import {
  AcademicSemesterModel,
  IAcademicSemester,
} from './academicSemester.interface';
import {
  AcademicsemesterCode,
  AcademicsemesterMonth,
  AcademicsemesterTitle,
} from './academicSemester.constant';
import ApiError from '../../../error/ApiError';

import httpStatus from 'http-status';

const AcademicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: {
      type: String,
      required: true,
      enum: AcademicsemesterTitle,
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: AcademicsemesterCode,
    },
    startMonth: {
      type: String,
      required: true,
      enum: AcademicsemesterMonth,
    },
    EndMonth: {
      type: String,
      required: true,
      enum: AcademicsemesterMonth,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

// same year same semester validation
AcademicSemesterSchema.pre('save', async function (next) {
  const isexist = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  });
  if (isexist) {
    throw new ApiError(httpStatus.CONFLICT, 'Academic semester already exist!');
  }

  next();
});

export const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
  'AcademicSemester',
  AcademicSemesterSchema,
);
