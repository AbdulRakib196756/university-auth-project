import httpStatus from 'http-status';
import sendResponse from '../../../shared/Sendresponse';
import catchAsync from '../../../shared/catchAsync';
import { Istudent } from './student.interface';
import { studentfilterablefeild } from './student.constant';
import pick from '../../../shared/Pick';
import { Request, Response } from 'express';
import { studentservice } from './student.service';
import { paginationFeild } from '../../../constants/pagination';

const getallstudent = catchAsync(async (req: Request, res: Response) => {
  const paginationOption = pick(req.query, paginationFeild);
  const filters = pick(req.query, studentfilterablefeild);

  const result = await studentservice.getAllstudentdata(
    paginationOption,
    filters,
  );

  sendResponse<Istudent[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'allstudent data retrived successfully',
    meta: result.meta,
    data: result.data,
  });
});
const getsinglestudentdata = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await studentservice.getsinglestudent(id);

  sendResponse<Istudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'student data retrived successfully',
    data: result,
  });
});
const updatestudentdata = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;
  const result = await studentservice.updatestudent(id, data);
  sendResponse<Istudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'student data updated successfully',
    data: result,
  });
});

export const studentcontroller = {
  getallstudent,
  getsinglestudentdata,
  updatestudentdata,
};
