import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

const findLaststudentId = async () => {
  const laststudent = await User.findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();

  return laststudent?.id ? laststudent.id.substring(4) : undefined;
};

export const generatestudentId = async (
  academicsemester: IAcademicSemester | null,
) => {
  const currentId =
    (await findLaststudentId()) || (0).toString().padStart(5, '0');
  let increamentId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  increamentId = `${academicsemester?.year.substring(2)}${academicsemester?.code}${increamentId}`;
  return increamentId;
};
const findlastfacultyId = async (): Promise<string | undefined> => {
  const lastFaculty = await User.findOne({ role: 'faculty' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

export const generatefacultyId = async (): Promise<string> => {
  const currentId =
    (await findlastfacultyId()) || (0).toString().padStart(5, '0');
  let increamentId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  increamentId = `F-${increamentId}`;
  return increamentId;
};

const findlastadminid = async (): Promise<string | undefined> => {
  const lastadmin = await User.findOne({ role: 'admin' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return lastadmin?.id ? lastadmin.id.substring(2) : undefined;
};

export const generateadminid = async (): Promise<string> => {
  const currentId =
    (await findlastadminid()) || (0).toString().padStart(5, '0');
  let increamentId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  increamentId = `A-${increamentId}`;
  return increamentId;
};
