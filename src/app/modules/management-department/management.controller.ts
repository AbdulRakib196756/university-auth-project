import httpStatus from 'http-status';
import sendResponse from '../../../shared/Sendresponse';
import catchAsync from '../../../shared/catchAsync';
import { Imanagement } from './managment.interface';
import { managementservice } from './management.service';
import pick from '../../../shared/Pick';
import { paginationFeild } from '../../../constants/pagination';
import { Request, Response } from 'express';

const createmanagement = catchAsync(async (req, res) => {
  const { ...data } = req.body;
  const result = await managementservice.createManagement(data);

  sendResponse<Imanagement>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'faculty create successfully',
    data: result,
  });
});
const getallmanagement = catchAsync(async (req: Request, res: Response) => {
  const paginationdata = pick(req.query, paginationFeild);
  const result = await managementservice.getallmanagement(paginationdata);
  sendResponse<Imanagement[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'all management retrived successfully',
    meta: result.meta,
    data: result.data,
  });
});
const getsinglemanagement = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await managementservice.getsinglemanagement(id);
  sendResponse<Imanagement>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'single managemnet retrived successfully',

    data: result,
  });
});

const Updatemanagementdata = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;
  const result = await managementservice.Updatemanagementdata(id, data);
  sendResponse<Imanagement>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'managemnet data updated successfully',

    data: result,
  });
});

const deletemanagement = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await managementservice.deletemanagement(id);
  sendResponse<Imanagement>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'managemnet data deleted successfully',

    data: result,
  });
});

export const managementcontroller = {
  createmanagement,
  getallmanagement,
  getsinglemanagement,
  Updatemanagementdata,
  deletemanagement,
};
