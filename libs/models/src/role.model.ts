import { Expense } from './expense.model';

export type Role = {
  id: string;
  name: string;
  infos: string;
  location: string;
  image: string;
  expenses: Expense[];
};
