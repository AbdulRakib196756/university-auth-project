import { z } from 'zod';

const updatestudentZodSchema = z.object({
  body: z.object({
    name: z.object({
      firstname: z.string().optional(),
      midlename: z.string().optional(),
      lastname: z.string().optional(),
    }),
    gender: z.enum(['male', 'female']).optional(),

    dateofbirth: z.string().optional(),
    email: z.string().email().optional(),
    academicFaculty: z.string().optional(),
    academicDepartment: z.string().optional(),
    academicSemester: z.string().optional(),
    profileimage: z.string().optional(),
  }),
});

export const studentValidation = {
  updatestudentZodSchema,
};
