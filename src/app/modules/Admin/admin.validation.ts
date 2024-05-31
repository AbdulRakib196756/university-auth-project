import { z } from 'zod';

const updateadminZodSchema = z.object({
  body: z.object({
    name: z
      .object({
        firstname: z.string().optional(),
        midlename: z.string().optional(),
        lastname: z.string().optional(),
      })
      .optional(),
    gender: z.enum(['male', 'female']).optional(),

    dateofbirth: z.string().optional(),
    email: z.string().email().optional(),
    managementdepartment: z.string().optional(),

    profileimage: z.string().optional(),
  }),
});

export const adminValidation = {
  updateadminZodSchema,
};
