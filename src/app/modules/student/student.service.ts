import { SortOrder } from 'mongoose';
import { paginationhelpers } from '../../../helpers/paginationHelper';
import { IGenenricResponse } from '../../../interfaces/common';
import { IPaginationOption } from '../../../interfaces/pagination';

import { Istudent, Istudentfilters } from './student.interface';
import { Student } from './student.model';
import { studentsearchfeild } from './student.constant';
import ApiError from '../../../error/ApiError';
import httpStatus from 'http-status';

const getAllstudentdata = async (
  paginationOptions: IPaginationOption,
  filters: Istudentfilters,
): Promise<IGenenricResponse<Istudent[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationhelpers.calculatepagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: studentsearchfeild.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Student.find(whereConditions)
    .populate('academicFaculty')
    .populate('academicDepartment')
    .populate('academicSemester')

    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Student.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getsinglestudent = async (id: string): Promise<Istudent | null> => {
  const data = await Student.findById(id)
    .populate('academicFaculty')
    .populate('academicDepartment')
    .populate('academicSemester');
  return data;
};
const updatestudent = async (
  id: string,
  payload: Partial<Istudent>,
): Promise<Istudent | null> => {
  const isexist = await Student.findOne({ id });
  if (!isexist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'student not found');
  }
  const { name, ...studentdata } = payload;
  const updatestudentdata: Partial<Istudent> = { ...studentdata };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const namekey = `name.${key}`;
      (updatestudentdata as any)[namekey] = name[key as keyof typeof name];
    });
  }

  const result = await Student.findOneAndUpdate({ id }, updatestudentdata, {
    new: true,
  })
    .populate('academicFaculty')
    .populate('academicDepartment')
    .populate('academicSemester');
  return result;
};

export const studentservice = {
  getAllstudentdata,
  getsinglestudent,
  updatestudent,
};
