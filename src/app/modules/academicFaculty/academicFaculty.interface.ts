import { Model } from 'mongoose';

export type Iacademicfaculty = {
  title: string;
};

export type Iacademicfacultyfilters = {
  searchTerm?: string;
};

export type IacademicfacultyModel = Model<Iacademicfaculty>;
