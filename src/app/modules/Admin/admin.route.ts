import express from 'express';
import { Admincontroller } from './admin.controller';
import validateRequest from '../../middleware/validateRequest';
import { adminValidation } from './admin.validation';

const router = express.Router();
router.get('/:id', Admincontroller.getsingleadmin);
router.patch(
  '/:id',
  validateRequest(adminValidation.updateadminZodSchema),
  Admincontroller.updateadmin,
);
router.get('/', Admincontroller.getalladmin);

export const adminroutes = router;
