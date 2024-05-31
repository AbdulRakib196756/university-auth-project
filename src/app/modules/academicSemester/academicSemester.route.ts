import express from 'express';

import validateRequest from '../../middleware/validateRequest';

import { AcademicSemesterValidation } from './academicSemester.validation';
import { AcademicSemesterController } from './academicSemester.controller';

const router = express.Router();

router.post(
  '/create-semester',
  validateRequest(AcademicSemesterValidation.AcademicsemesterZodSchema),
  AcademicSemesterController.createSemester,
);

router.get('/:id', AcademicSemesterController.getsinglesemester);
router.patch(
  '/:id',
  validateRequest(AcademicSemesterValidation.AcademicsemesterupdateZodSchema),
  AcademicSemesterController.updatesemester,
);
router.delete('/:id', AcademicSemesterController.deletesemester);
router.get('/', AcademicSemesterController.Getallsemester);

export const SemesterRoutes = router;
