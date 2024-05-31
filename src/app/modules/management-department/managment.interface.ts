import { Model } from 'mongoose';

export type Imanagement = {
  title: string;
};

export type managementmodel = Model<Imanagement, Record<string, unknown>>;
