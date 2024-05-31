import validateRequest from '../../middleware/validateRequest';
import { studentcontroller } from './student.controller';
import express from 'express';
import { studentValidation } from './student.validation';

const router = express.Router();

router.get('/:id', studentcontroller.getsinglestudentdata);
router.patch(
  '/:id',
  validateRequest(studentValidation.updatestudentZodSchema),
  studentcontroller.updatestudentdata,
);
router.get('/', studentcontroller.getallstudent);

export const studentroutes = router;
