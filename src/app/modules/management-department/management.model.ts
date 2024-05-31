import { Schema, model } from 'mongoose';
import { Imanagement, managementmodel } from './managment.interface';

const managementschema = new Schema<Imanagement, managementmodel>(
  {
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const Management = model<Imanagement, managementmodel>(
  'Management',
  managementschema,
);
