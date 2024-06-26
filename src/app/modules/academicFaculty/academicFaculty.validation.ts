import { z } from 'zod';

const academicfacultyZodschema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is required',
    }),
  }),
});

export const academicfacultyvalidation = {
  academicfacultyZodschema,
};
