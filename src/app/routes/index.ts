import express from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { SemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { academicfacultyroutes } from '../modules/academicFaculty/academicFaculty.route';
import { departmentroutes } from '../modules/academicDepartment/academicDepartment.route';
import { studentroutes } from '../modules/student/student.route';
import { facultyroutes } from '../modules/Faculty/faculty.router';
import { managementroutes } from '../modules/management-department/management.route';
import { adminroutes } from '../modules/Admin/admin.route';

const router = express.Router();
const moduleRouts = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/academic-semester',
    route: SemesterRoutes,
  },
  {
    path: '/academic-faculty',
    route: academicfacultyroutes,
  },
  {
    path: '/academic-department',
    route: departmentroutes,
  },
  {
    path: '/student',
    route: studentroutes,
  },
  {
    path: '/faculty',
    route: facultyroutes,
  },
  {
    path: '/management-department',
    route: managementroutes,
  },
  {
    path: '/admins',
    route: adminroutes,
  },
];

moduleRouts.forEach(route => router.use(route.path, route.route));

export default router;
