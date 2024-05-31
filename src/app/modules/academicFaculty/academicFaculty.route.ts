import express from 'express';
import { academicfacultycontroller } from './academicFaculty.controller';
import validateRequest from '../../middleware/validateRequest';
import { academicfacultyvalidation } from './academicFaculty.validation';

const router = express.Router();

router.post(
  '/createfaculty',
  validateRequest(academicfacultyvalidation.academicfacultyZodschema),
  academicfacultycontroller.createfaculty,
);
router.get('/:id', academicfacultycontroller.getsinglefacultydata);
router.patch('/:id', academicfacultycontroller.Updatefacultydata);
router.delete('/:id', academicfacultycontroller.Deletefacultybyid);
router.get('/', academicfacultycontroller.getAllfacultydata);

export const academicfacultyroutes = router;
