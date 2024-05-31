import { Request, Response } from 'express';
import pick from '../../../shared/Pick';
import catchAsync from '../../../shared/catchAsync';
import { paginationFeild } from '../../../constants/pagination';
import { IAdmin } from './admin.interface';
import sendResponse from '../../../shared/Sendresponse';
import httpStatus from 'http-status';
import { adminfilterablefeild } from './admin.constant';
import { adminservice } from './admin.service';

const getalladmin = catchAsync(async (req: Request, res: Response) => {
  const paginationOption = pick(req.query, paginationFeild);
  const filters = pick(req.query, adminfilterablefeild);

  const result = await adminservice.getalladmin(paginationOption, filters);

  sendResponse<IAdmin[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'alladmin data retrived successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getsingleadmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await adminservice.getsingleadmin(id);
  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'admin data retrived successfully',

    data: result,
  });
});
const updateadmin = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const id = req.params.id;
  const result = await adminservice.updateadmin(data, id);
  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'admin data updated successfully',

    data: result,
  });
});

export const Admincontroller = {
  getalladmin,
  getsingleadmin,
  updateadmin,
};
