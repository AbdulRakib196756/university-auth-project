import { SortOrder } from 'mongoose';
import { paginationhelpers } from '../../../helpers/paginationHelper';
import { IGenenricResponse } from '../../../interfaces/common';
import { IPaginationOption } from '../../../interfaces/pagination';
import { Management } from './management.model';
import { Imanagement } from './managment.interface';

const createManagement = async (
  payload: Imanagement,
): Promise<Imanagement | undefined> => {
  const result = await Management.create(payload);
  return result;
};
const getallmanagement = async (
  paginationdata: IPaginationOption,
): Promise<IGenenricResponse<Imanagement[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationhelpers.calculatepagination(paginationdata);
  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const result = await Management.find()
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await Management.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
const getsinglemanagement = async (id: string): Promise<Imanagement | null> => {
  const result = await Management.findById(id);
  return result;
};
const Updatemanagementdata = async (
  id: string,
  payload: Partial<Imanagement>,
): Promise<Imanagement | null> => {
  const result = await Management.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};
const deletemanagement = async (id: string): Promise<Imanagement | null> => {
  const result = await Management.findByIdAndDelete(id);
  return result;
};
export const managementservice = {
  createManagement,
  getallmanagement,
  getsinglemanagement,
  Updatemanagementdata,
  deletemanagement,
};
