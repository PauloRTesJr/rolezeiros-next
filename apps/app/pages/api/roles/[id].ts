import { ExpenseDocument } from '@rolezeiros/models';
import { NextApiRequest, NextApiResponse } from 'next/types';
import { collectionFetcher, documentFetcher } from '../../../helpers/fetcher';
import { mapExpensesToPromises } from '../../../helpers/roles';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const role = await documentFetcher(`roles/${id}`);

  const expenses = await collectionFetcher(`roles/${id}/expenses`);

  const populatedExpenses = await Promise.all(
    mapExpensesToPromises(expenses as ExpenseDocument[])
  );

  res.status(200).json({ ...role, expenses: populatedExpenses });
}
