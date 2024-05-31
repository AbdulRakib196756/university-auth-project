import mongoose from 'mongoose';
import config from '../../../config';
import ApiError from '../../../error/ApiError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { Istudent } from '../student/student.interface';
import { IUser } from './user.interface';
import { User } from './user.model';
import {
  generateadminid,
  generatefacultyId,
  generatestudentId,
} from './user.utils';
import { Student } from '../student/student.model';
import httpStatus from 'http-status';
import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { Ifaculty } from '../Faculty/Faculty.interface';
import { Faculty } from '../Faculty/faculty.model';
import { IAdmin } from '../Admin/admin.interface';
import { Admin } from '../Admin/admin.model';

const createStudent = async (
  student: Istudent,
  user: IUser,
): Promise<IUser | null> => {
  // default password
  if (!user.password) {
    user.password = config.default_student_password as string;
  }
  // set role
  user.role = 'student';

  const academicsemester = await AcademicSemester.findById(
    student.academicSemester,
  ).lean();

  // generate student id
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const id = await generatestudentId(academicsemester as IAcademicSemester);

    user.id = id;
    student.id = id;

    //array
    const newStudent = await Student.create([student], { session });

    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    //set student -->  _id into user.student
    user.student = newStudent[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicSemester',
        },
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    });
  }

  return newUserAllData;
};

const createFaculty = async (
  faculty: Ifaculty,
  user: IUser,
): Promise<IUser | null> => {
  if (!user.password) {
    user.password = config.default_student_password as string;
  }
  user.role = 'faculty';
  let newuseralldata = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const userid = await generatefacultyId();
    user.id = userid;
    faculty.id = userid;
    const newfaculty = await Faculty.create([faculty], { session });

    if (!newfaculty.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
    }
    user.faculty = newfaculty[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    newuseralldata = newUser[0];
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
  if (newuseralldata) {
    newuseralldata = await newuseralldata.populate({
      path: 'faculty',
      populate: [
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    });
  }
  return newuseralldata;
};
const createadmin = async (
  admin: IAdmin,
  user: IUser,
): Promise<IUser | null> => {
  if (!user?.password) {
    user.password = config.default_student_password as string;
  }
  user.role = 'admin';
  let newuseralldata = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const userid = await generateadminid();
    user.id = userid;
    admin.id = userid;

    const newadmin = await Admin.create([admin], { session });
    if (!newadmin.length) {
      throw new ApiError(httpStatus.NOT_FOUND, 'failed to create admin');
    }
    user.admin = newadmin[0]._id;
    const newuser = await User.create([user], { session });
    if (!newuser.length) {
      throw new ApiError(httpStatus.NOT_FOUND, 'failed to create user');
    }
    newuseralldata = newuser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
  if (newuseralldata) {
    newuseralldata = await newuseralldata.populate({
      path: 'admin',
      populate: {
        path: 'managementdepartment',
      },
    });
  }
  return newuseralldata;
};
export const userService = {
  createStudent,
  createFaculty,
  createadmin,
};
