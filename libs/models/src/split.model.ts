import { User } from './user.model';

export type Split = { [key: string]: SplitValue };

export type SplitValue = { user: User; share: { [key: string]: number } };
