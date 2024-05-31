import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { facultyfilterablefeild } from './faculty.constant';
import pick from '../../../shared/Pick';
import sendResponse from '../../../shared/Sendresponse';
import { Ifaculty } from './Faculty.interface';
import httpStatus from 'http-status';
import { paginationFeild } from '../../../constants/pagination';
import { facultyservice } from './faculty.service';

const getallfaculty = catchAsync(async (req: Request, res: Response) => {
  const paginationOption = pick(req.query, paginationFeild);
  const filters = pick(req.query, facultyfilterablefeild);

  const result = await facultyservice.getAllfacultydata(
    paginationOption,
    filters,
  );

  sendResponse<Ifaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'allfaculty data retrived successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getsinglefaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await facultyservice.getsingleFaculty(id);
  sendResponse<Ifaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'faculty data retrived successfully',
    data: result,
  });
});
const updatefaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;
  const result = await facultyservice.updatefaculty(id, data);
  sendResponse<Ifaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'faculty data updated successfully',
    data: result,
  });
});
export const facultycontroller = {
  getallfaculty,
  getsinglefaculty,
  updatefaculty,
};
