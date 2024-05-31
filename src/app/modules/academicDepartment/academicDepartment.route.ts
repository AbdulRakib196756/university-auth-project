import express from 'express';

import { Academicdepartmentcontroller } from './academicDepartment.controller';
import validateRequest from '../../middleware/validateRequest';
import { AcademicDepartmentValidation } from './academicDepartement.validation';

const router = express.Router();

router.post(
  '/create-department',
  validateRequest(
    AcademicDepartmentValidation.createAcademicDepartmentZodSchema,
  ),
  Academicdepartmentcontroller.createDepartment,
);
router.get('/:id', Academicdepartmentcontroller.getsingledepartment);
router.patch('/:id', Academicdepartmentcontroller.updatedepartmentdata);
router.delete('/:id', Academicdepartmentcontroller.deleteDepartmentData);
router.get('/', Academicdepartmentcontroller.getalldepartment);

export const departmentroutes = router;
