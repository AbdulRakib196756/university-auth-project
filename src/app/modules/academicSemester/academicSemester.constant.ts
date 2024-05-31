import { Code, Months, SemesterTitle } from './academicSemester.interface';

export const AcademicsemesterMonth: Months[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
export const AcademicsemesterTitle: SemesterTitle[] = [
  'Autumn',
  'Summer',
  'Fall',
];
export const AcademicsemesterCode: Code[] = ['01', '02', '03'];

export const AcademicsemesterMapper: { [key: string]: string } = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};

export const searchfeild = ['title', 'code'];
export const semesterfilterablefeild = ['searchTerm', 'title', 'code', 'year'];
