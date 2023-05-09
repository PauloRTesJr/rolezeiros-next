import { DocumentReference } from 'firebase/firestore';
import { User } from './user.model';

export type Expense = {
  id: string;
  name: string;
  price: number;
  owner?: User;
  participants?: User[];
};

export type ExpenseDocument = {
  id: string;
  name: string;
  price: number;
  owner: DocumentReference;
  participants: DocumentReference[];
};
