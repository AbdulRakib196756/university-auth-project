import { SortOrder } from 'mongoose';
import { paginationhelpers } from '../../../helpers/paginationHelper';
import { IGenenricResponse } from '../../../interfaces/common';
import { IPaginationOption } from '../../../interfaces/pagination';
import {
  IAcademicDepartmentFilters,
  IacademicDepartment,
} from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';
import { academicDepartmentSearchableFields } from './academicDepartment.constant';

const CreateDepartmentdata = async (
  payload: IacademicDepartment,
): Promise<IacademicDepartment> => {
  const result = (await AcademicDepartment.create(payload)).populate(
    'academicFaculty',
  );
  return result;
};
const getallDepartment = async (
  paginationOption: IPaginationOption,
  filters: IAcademicDepartmentFilters,
): Promise<IGenenricResponse<IacademicDepartment[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationhelpers.calculatepagination(paginationOption);
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: academicDepartmentSearchableFields.map(field => ({
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

  const result = await AcademicDepartment.find(whereConditions)
    .populate('academicFaculty')
    .skip(skip)
    .limit(limit);
  const total = await AcademicDepartment.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
const getSingleDepartment = async (
  id: string,
): Promise<IacademicDepartment | null> => {
  const result =
    await AcademicDepartment.findById(id).populate('academicFaculty');
  return result;
};
const updateDepartmentdata = async (
  id: string,
  payload: Partial<IacademicDepartment>,
): Promise<IacademicDepartment | null> => {
  const result = await AcademicDepartment.findByIdAndUpdate(
    { _id: id },
    payload,
    { new: true },
  ).populate('academicFaculty');
  return result;
};
const deleteDepartmentData = async (
  id: string,
): Promise<IacademicDepartment | null> => {
  const result = await AcademicDepartment.findByIdAndDelete({ _id: id });
  return result;
};
export const academicdepartmentservice = {
  CreateDepartmentdata,
  getallDepartment,
  getSingleDepartment,
  updateDepartmentdata,
  deleteDepartmentData,
};
