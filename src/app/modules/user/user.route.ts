import express from 'express';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';
import validateRequest from '../../middleware/validateRequest';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(UserValidation.CreateStudentZodSchema),
  UserController.createstudent,
);
router.post(
  '/create-faculty',
  validateRequest(UserValidation.CreatefacultyZodSchema),
  UserController.createfaculty,
);
router.post(
  '/create-admin',
  validateRequest(UserValidation.CreateadminZodSchema),
  UserController.createadmin,
);

export const UserRoutes = router;
