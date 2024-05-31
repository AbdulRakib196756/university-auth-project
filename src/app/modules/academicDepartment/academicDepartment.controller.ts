import { Request, Response } from 'express';
import catchAsynch from '../../../shared/catchAsync';
import { academicdepartmentservice } from './academicDepartment.service';
import { IacademicDepartment } from './academicDepartment.interface';
import sendResponse from '../../../shared/Sendresponse';
import httpStatus from 'http-status';
import pick from '../../../shared/Pick';
import { paginationFeild } from '../../../constants/pagination';
import { academicDepartmentFilterableFields } from './academicDepartment.constant';

const createDepartment = catchAsynch(async (req: Request, res: Response) => {
  const { ...departmentdata } = req.body;
  const result =
    await academicdepartmentservice.CreateDepartmentdata(departmentdata);
  sendResponse<IacademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'department create successfully',
    data: result,
  });
});

const getalldepartment = catchAsynch(async (req: Request, res: Response) => {
  const paginationoption = pick(req.query, paginationFeild);
  const filtarableOption = pick(req.query, academicDepartmentFilterableFields);
  const result = await academicdepartmentservice.getallDepartment(
    paginationoption,
    filtarableOption,
  );
  sendResponse<IacademicDepartment[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'department retrived successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getsingledepartment = catchAsynch(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await academicdepartmentservice.getSingleDepartment(id);
  sendResponse<IacademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'department retrived successfully',
    data: result,
  });
});
const updatedepartmentdata = catchAsynch(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = req.body;
    const result = await academicdepartmentservice.updateDepartmentdata(
      id,
      data,
    );
    sendResponse<IacademicDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'department updated successfully',
      data: result,
    });
  },
);
const deleteDepartmentData = catchAsynch(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await academicdepartmentservice.deleteDepartmentData(id);
    sendResponse<IacademicDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'department deleted successfully',
      data: result,
    });
  },
);
export const Academicdepartmentcontroller = {
  createDepartment,
  getalldepartment,
  getsingledepartment,
  updatedepartmentdata,
  deleteDepartmentData,
};
