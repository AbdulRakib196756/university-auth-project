import { z } from 'zod';

const ManagementcreateZodschema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is required',
    }),
  }),
});
const ManagementupdateZodschema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is required',
    }),
  }),
});

export const managementzod = {
  ManagementcreateZodschema,
  ManagementupdateZodschema,
};
