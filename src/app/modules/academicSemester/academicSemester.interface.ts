import { Model } from 'mongoose';
export type Months =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';
export type SemesterTitle = 'Autumn' | 'Summer' | 'Fall';
export type Code = '01' | '02' | '03';
export type IAcademicSemester = {
  title: SemesterTitle;
  year: string;
  code: Code;
  startMonth: Months;
  EndMonth: Months;
};

export type AcademicSemesterModel = Model<IAcademicSemester>;

export type Iacademicsemesterfilters = {
  searchTerm?: string;
};
