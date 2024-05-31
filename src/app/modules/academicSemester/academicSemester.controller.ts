import { Request, RequestHandler, Response } from 'express';

import { AcademicsemesterService } from './academicSemester.service';
import catchAsynch from '../../../shared/catchAsync';
import sendResponse from '../../../shared/Sendresponse';
import httpStatus from 'http-status';
import pick from '../../../shared/Pick';

import { IAcademicSemester } from './academicSemester.interface';

import { paginationFeild } from '../../../constants/pagination';
import { semesterfilterablefeild } from './academicSemester.constant';

const createSemester: RequestHandler = catchAsynch(
  async (req: Request, res: Response) => {
    const { ...AcademicSemesterData } = req.body;
    const result =
      await AcademicsemesterService.createSemester(AcademicSemesterData);

    // res.status(200).json({
    //   success: true,
    //   message: 'AcademicSemester created sucessfully',
    //   data: result,
    // });
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'semester creater successfully',
      data: result,
    });
  },
);

const Getallsemester = catchAsynch(async (req: Request, res: Response) => {
  // const paginationOption = {
  //   Page: Number(req.query.page),
  //   Limit: Number(req.query.limit),
  //   sortBy: req.query.sortBy,
  //   sortOrder: req.query.sortOrder,
  // };
  const paginationOption = pick(req.query, paginationFeild);
  const filters = pick(req.query, semesterfilterablefeild);

  const result = await AcademicsemesterService.getAllsemesters(
    filters,
    paginationOption,
  );
  sendResponse<IAcademicSemester[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'semester retrived successfully',
    meta: result.meta,
    data: result.data,
  });
});
const getsinglesemester = catchAsynch(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AcademicsemesterService.getSingleSemester(id);
  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'semester retrived successfully',
    data: result,
  });
});
const updatesemester = catchAsynch(async (req: Request, res: Response) => {
  const id = req.params.id;
  const upadatedData = req.body;
  const result = await AcademicsemesterService.updateSemester(id, upadatedData);
  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'semester updated successfully',
    data: result,
  });
});
const deletesemester = catchAsynch(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AcademicsemesterService.deletesemesterbyid(id);
  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'semester deleted successfully',
    data: result,
  });
});
export const AcademicSemesterController = {
  createSemester,
  Getallsemester,
  getsinglesemester,
  updatesemester,
  deletesemester,
};
