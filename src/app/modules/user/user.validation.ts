import { z } from 'zod';

// request validation
// body => Object
// data =>object

const CreateStudentZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z.object({
      name: z.object({
        firstname: z.string({
          required_error: 'first name is required',
        }),
        midlename: z.string().optional(),
        lastname: z.string({
          required_error: 'lastname name is required',
        }),
      }),
      gender: z.enum(['male', 'female'], {
        required_error: 'gender is required',
      }),

      dateofbirth: z.string({
        required_error: 'dateof birth is required',
      }),
      email: z
        .string({
          required_error: 'email is required',
        })
        .email(),
      academicFaculty: z.string({
        required_error: 'faculty is required',
      }),
      academicDepartment: z.string({
        required_error: 'faculty is required',
      }),
      academicSemester: z.string({
        required_error: 'faculty is required',
      }),
      profileimage: z.string().optional(),
    }),
  }),
});
const CreatefacultyZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    faculty: z.object({
      name: z.object({
        firstname: z.string({
          required_error: 'first name is required',
        }),
        midlename: z.string().optional(),
        lastname: z.string({
          required_error: 'lastname name is required',
        }),
      }),
      gender: z.enum(['male', 'female'], {
        required_error: 'gender is required',
      }),

      dateofbirth: z.string({
        required_error: 'dateof birth is required',
      }),
      email: z
        .string({
          required_error: 'email is required',
        })
        .email(),
      designation: z.string({
        required_error: 'designation is required',
      }),
      academicDepartment: z.string({
        required_error: 'faculty is required',
      }),
      academicFaculty: z.string({
        required_error: 'faculty is required',
      }),

      profileimage: z.string().optional(),
    }),
  }),
});
const CreateadminZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    admin: z.object({
      name: z.object({
        firstname: z.string({
          required_error: 'first name is required',
        }),
        midlename: z.string().optional(),
        lastname: z.string({
          required_error: 'lastname name is required',
        }),
      }),
      gender: z.enum(['male', 'female'], {
        required_error: 'gender is required',
      }),

      dateofbirth: z.string({
        required_error: 'dateof birth is required',
      }),
      email: z
        .string({
          required_error: 'email is required',
        })
        .email(),
      managementdepartment: z.string({
        required_error: 'management department is required',
      }),
      designation: z.string({
        required_error: 'designation is required',
      }),

      profileimage: z.string().optional(),
    }),
  }),
});

export const UserValidation = {
  CreateStudentZodSchema,
  CreatefacultyZodSchema,
  CreateadminZodSchema,
};
