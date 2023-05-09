import { NextApiRequest, NextApiResponse } from 'next/types';
import {
  collectionFetcher,
  documentFetcher,
} from '../../../../helpers/fetcher';
import {
  Expense,
  ExpenseDocument,
  Split,
  SplitValue,
  User,
} from '@rolezeiros/models';
import { mapExpensesToPromises } from '../../../../helpers/roles';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  const roleDoc = await documentFetcher(`roles/${id}`);

  const expenses = await collectionFetcher(`roles/${id}/expenses`);

  const populatedExpenses = await Promise.all(
    mapExpensesToPromises(expenses as ExpenseDocument[])
  );

  const role = { ...roleDoc, expenses: populatedExpenses };

  const users = await collectionFetcher('users');

  return res.status(200).json(calculateEach(role.expenses, users as User[]));
}

const calculateEach = (expenses: Expense[], users: User[]): Split => {
  // Initializate split object
  const split = users.reduce((acc, curr) => {
    acc[curr.id] = {
      user: curr,
      share: users.reduce((shareAcc, shareCurr) => {
        shareAcc[shareCurr.id] = 0;
        return shareAcc;
      }, {} as { [key: string]: number }),
    } as SplitValue;
    return acc;
  }, {} as Split);

  expenses.forEach((expense) => {
    const eachPersonAmount = expense.price / expense.participants.length;
    expense.participants.forEach((participant) => {
      if (participant !== expense.owner) {
        split[expense.owner.id].share[participant.id] += eachPersonAmount;
        split[participant.id].share[expense.owner.id] -= eachPersonAmount;
      }
    });
  });

  return split;
};
