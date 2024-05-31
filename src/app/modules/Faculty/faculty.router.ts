import express from 'express';
import { facultycontroller } from './faculty.controller';
import validateRequest from '../../middleware/validateRequest';
import { facultyValidation } from './faculty.validation';

const router = express.Router();
router.get('/:id', facultycontroller.getsinglefaculty);
router.patch(
  '/:id',
  validateRequest(facultyValidation.updatefacultyZodSchema),
  facultycontroller.updatefaculty,
);
router.get('/', facultycontroller.getallfaculty);

export const facultyroutes = router;
