import { Schema, model } from 'mongoose';
import { IAdmin, adminmodel } from './admin.interface';

const Adminschema = new Schema<IAdmin, adminmodel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      firstname: {
        type: String,
        required: true,
      },
      midlename: {
        type: String,
      },
      lastname: {
        type: String,
        required: true,
      },
    },
    dateofbirth: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    managementdepartment: {
      type: Schema.Types.ObjectId,
      ref: 'Management',
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    profileimage: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const Admin = model<IAdmin, adminmodel>('Admin', Adminschema);
