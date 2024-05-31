import { SortOrder } from 'mongoose';
import { paginationhelpers } from '../../../helpers/paginationHelper';
import { IGenenricResponse } from '../../../interfaces/common';
import { IPaginationOption } from '../../../interfaces/pagination';

import { Ifaculty, Ifacultyfilters } from './Faculty.interface';
import { facultsearchfeild } from './faculty.constant';
import { Faculty } from './faculty.model';
import ApiError from '../../../error/ApiError';
import httpStatus from 'http-status';

const getAllfacultydata = async (
  paginationOptions: IPaginationOption,
  filters: Ifacultyfilters,
): Promise<IGenenricResponse<Ifaculty[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationhelpers.calculatepagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: facultsearchfeild.map(field => ({
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

  const result = await Faculty.find(whereConditions)
    .populate('academicDepartment')
    .populate('academicFaculty')

    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Faculty.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
const getsingleFaculty = async (id: string): Promise<Ifaculty | null> => {
  const result = await Faculty.findOne({ id })
    .populate('academicDepartment')
    .populate('academicFaculty');
  return result;
};
const updatefaculty = async (
  id: string,
  payload: Partial<Ifaculty>,
): Promise<Ifaculty | null> => {
  const isexist = await Faculty.findOne({ id });
  if (!isexist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'faculty not found');
  }
  const { name, ...facultydata } = payload;
  const updatedfacultydata: Partial<Ifaculty> = { ...facultydata };
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const namekey = `name.${key}`;
      (updatedfacultydata as any)[namekey] = name[key as keyof typeof name];
    });
  }
  const result = await Faculty.findOneAndUpdate({ id }, updatedfacultydata, {
    new: true,
  })
    .populate('academicDepartment')
    .populate('academicFaculty');

  return result;
};

export const facultyservice = {
  getAllfacultydata,
  getsingleFaculty,
  updatefaculty,
};
