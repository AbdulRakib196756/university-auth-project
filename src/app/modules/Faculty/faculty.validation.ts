import { z } from 'zod';

const updatefacultyZodSchema = z.object({
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
    designation: z.string().optional(),
    academicDepartment: z.string().optional(),
    academicFaculty: z.string().optional(),

    profileimage: z.string().optional(),
  }),
});

export const facultyValidation = {
  updatefacultyZodSchema,
};
