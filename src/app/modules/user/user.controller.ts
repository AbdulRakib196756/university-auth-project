import { Request, RequestHandler, Response } from 'express';

import catchAsynch from '../../../shared/catchAsync';
import sendResponse from '../../../shared/Sendresponse';
import httpStatus from 'http-status';
import { IUser } from './user.interface';
import { userService } from './user.service';

const createstudent: RequestHandler = catchAsynch(
  async (req: Request, res: Response) => {
    const { student, ...userData } = req.body;
    const result = await userService.createStudent(student, userData);

    // res.status(200).json({
    //   success: true,
    //   message: 'user created sucessfully',
    //   data: result,
    // });
    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'user creater successfully',
      data: result,
    });
  },
);
const createfaculty = catchAsynch(async (req: Request, res: Response) => {
  const { faculty, ...userData } = req.body;
  const result = await userService.createFaculty(faculty, userData);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user creater successfully',
    data: result,
  });
});
const createadmin = catchAsynch(async (req: Request, res: Response) => {
  const { admin, ...userdata } = req.body;
  const result = await userService.createadmin(admin, userdata);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user creater successfully',
    data: result,
  });
});

export const UserController = {
  createstudent,
  createfaculty,
  createadmin,
};
