import { z } from 'zod';
import {
  AcademicsemesterCode,
  AcademicsemesterMonth,
  AcademicsemesterTitle,
} from './academicSemester.constant';

// request validation
// body => Object
// data =>object

const AcademicsemesterZodSchema = z.object({
  body: z.object({
    title: z.enum([...AcademicsemesterTitle] as [string, ...string[]], {
      required_error: 'title is required',
    }),
    year: z.string({
      required_error: 'year is required ',
    }),
    code: z.enum([...AcademicsemesterCode] as [string, ...string[]], {
      required_error: 'code is required',
    }),
    startMonth: z.enum([...AcademicsemesterMonth] as [string, ...string[]], {
      required_error: 'start month is required',
    }),
    //zod er khetre enum user korle enum rakhtei hobe tai ekta enum fixed rakhci
    EndMonth: z.enum([...AcademicsemesterMonth] as [string, ...string[]], {
      required_error: 'End month is required',
    }),
  }),
});
const AcademicsemesterupdateZodSchema = z
  .object({
    body: z.object({
      title: z
        .enum([...AcademicsemesterTitle] as [string, ...string[]], {
          required_error: 'title is required',
        })
        .optional(),
      year: z
        .string({
          required_error: 'year is required ',
        })
        .optional(),
      code: z
        .enum([...AcademicsemesterCode] as [string, ...string[]], {
          required_error: 'code is required',
        })
        .optional(),
      startMonth: z
        .enum([...AcademicsemesterMonth] as [string, ...string[]], {
          required_error: 'start month is required',
        })
        .optional(),
      //zod er khetre enum user korle enum rakhtei hobe tai ekta enum fixed rakhci
      EndMonth: z
        .enum([...AcademicsemesterMonth] as [string, ...string[]], {
          required_error: 'End month is required',
        })
        .optional(),
    }),
  })
  .refine(
    data =>
      (data.body.title && data.body.code) ||
      (!data.body.title && !data.body.code),
    { message: 'Either both title & code must be provide or neither' },
  );

export const AcademicSemesterValidation = {
  AcademicsemesterZodSchema,
  AcademicsemesterupdateZodSchema,
};
