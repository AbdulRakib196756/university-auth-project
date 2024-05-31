import { SortOrder } from 'mongoose';
import { paginationhelpers } from '../../../helpers/paginationHelper';
import { IGenenricResponse } from '../../../interfaces/common';
import { IPaginationOption } from '../../../interfaces/pagination';
import { adminsearchfeild } from './admin.constant';
import { IAdmin, Iadminfiltarablefeild } from './admin.interface';
import { Admin } from './admin.model';

import httpStatus from 'http-status';
import ApiError from '../../../error/ApiError';
import { object } from 'zod';

const getalladmin = async (
  pagination: IPaginationOption,
  filters: Iadminfiltarablefeild,
): Promise<IGenenricResponse<IAdmin[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationhelpers.calculatepagination(pagination);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: adminsearchfeild.map(field => ({
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

  const result = await Admin.find(whereConditions)
    .populate('managementdepartment')

    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Admin.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
const getsingleadmin = async (id: string): Promise<IAdmin | null> => {
  const result = await Admin.findOne({ id }).populate('managementdepartment');
  return result;
};

const updateadmin = async (
  payload: Partial<IAdmin>,
  id: string,
): Promise<IAdmin | null> => {
  const isexist = await Admin.findOne({ id });
  if (!isexist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'admin not found');
  }

  const { name, ...admindata } = payload;
  const updateadmindata: Partial<IAdmin> = { ...admindata };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const namekey = `name.${key}`;
      (updateadmindata as any)[namekey] = name[key as keyof typeof name];
    });
  }
  const result = await Admin.findOneAndUpdate({ id }, updateadmindata, {
    new: true,
  }).populate('managementdepartment');
  return result;
};
export const adminservice = {
  getalladmin,
  getsingleadmin,
  updateadmin,
};
