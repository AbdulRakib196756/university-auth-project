import { Request, RequestHandler, Response } from 'express';
import catchAsynch from '../../../shared/catchAsync';
import httpStatus from 'http-status';
import { Iacademicfaculty } from './academicFaculty.interface';
import sendResponse from '../../../shared/Sendresponse';
import { academicfacultyservice } from './academicFaculty.service';
import pick from '../../../shared/Pick';
import { paginationFeild } from '../../../constants/pagination';

import { facultyfilterablefeild } from './academicfaculty.constant';

const createfaculty: RequestHandler = catchAsynch(
  async (req: Request, res: Response) => {
    const { ...facultyData } = req.body;

    const result = await academicfacultyservice.createfaculty(facultyData);
    sendResponse<Iacademicfaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'faculty create successfully',
      data: result,
    });
  },
);

const getAllfacultydata = catchAsynch(async (req: Request, res: Response) => {
  const paginationoption = pick(req.query, paginationFeild);
  const Filters = pick(req.query, facultyfilterablefeild);
  const result = await academicfacultyservice.getallfaculty(
    paginationoption,
    Filters,
  );

  sendResponse<Iacademicfaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'faculty retrived successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getsinglefacultydata = catchAsynch(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await academicfacultyservice.getsinglefaculty(id);

    sendResponse<Iacademicfaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'faculty retrived succesfully',
      data: result,
    });
  },
);

const Updatefacultydata = catchAsynch(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updateddata = req.body;
  const result = await academicfacultyservice.updatefaculty(id, updateddata);
  sendResponse<Iacademicfaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'faculty updated succesfully',
    data: result,
  });
});
const Deletefacultybyid = catchAsynch(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await academicfacultyservice.Deletefacultybyidfromdb(id);
  sendResponse<Iacademicfaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'semester deleted succesfully',
    data: result,
  });
});

export const academicfacultycontroller = {
  createfaculty,
  getAllfacultydata,
  getsinglefacultydata,
  Updatefacultydata,
  Deletefacultybyid,
};
