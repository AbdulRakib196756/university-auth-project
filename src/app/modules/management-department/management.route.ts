import express from 'express';
import { managementcontroller } from './management.controller';
import validateRequest from '../../middleware/validateRequest';
import { managementzod } from './management.validation';

const router = express.Router();

router.post(
  '/createmanagement',
  validateRequest(managementzod.ManagementcreateZodschema),
  managementcontroller.createmanagement,
);
router.get('/:id', managementcontroller.getsinglemanagement);
router.patch(
  '/:id',
  validateRequest(managementzod.ManagementupdateZodschema),
  managementcontroller.Updatemanagementdata,
);
router.delete(
  '/:id',

  managementcontroller.deletemanagement,
);
router.get('/', managementcontroller.getallmanagement);

export const managementroutes = router;
