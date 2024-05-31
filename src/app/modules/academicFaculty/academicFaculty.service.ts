import { SortOrder } from 'mongoose';
import { paginationhelpers } from '../../../helpers/paginationHelper';
import { IGenenricResponse } from '../../../interfaces/common';

import { IPaginationOption } from '../../../interfaces/pagination';
import {
  Iacademicfaculty,
  Iacademicfacultyfilters,
} from './academicFaculty.interface';
import { academicFaculty } from './academicFaculty.model';
import { facultysearchablefeild } from './academicfaculty.constant';

const createfaculty = async (
  payload: Iacademicfaculty,
): Promise<Iacademicfaculty> => {
  const result = await academicFaculty.create(payload);

  return result;
};

const getallfaculty = async (
  paginationOption: IPaginationOption,
  filters: Iacademicfacultyfilters,
): Promise<IGenenricResponse<Iacademicfaculty[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationhelpers.calculatepagination(paginationOption);
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: facultysearchablefeild.map(field => ({
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

  const result = await academicFaculty
    .find(whereConditions)
    .skip(skip)
    .limit(limit);
  const total = await academicFaculty.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getsinglefaculty = async (
  id: string,
): Promise<Iacademicfaculty | null> => {
  const result = await academicFaculty.findById(id);
  return result;
};
const updatefaculty = async (
  id: string,
  payload: Partial<Iacademicfaculty>,
): Promise<Iacademicfaculty | null> => {
  const result = academicFaculty.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};
const Deletefacultybyidfromdb = async (
  id: string,
): Promise<Iacademicfaculty | null> => {
  const result = academicFaculty.findOneAndDelete({ _id: id });
  return result;
};
export const academicfacultyservice = {
  createfaculty,
  getallfaculty,
  getsinglefaculty,
  updatefaculty,
  Deletefacultybyidfromdb,
};
