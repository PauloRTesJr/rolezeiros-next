import { addDoc, collection, doc } from 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from 'next/types';
import { db } from '@rolezeiros/firebase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === 'POST') {
    const expenseCollection = collection(db, `roles/${id}/expenses`);

    const docRef = await addDoc(
      expenseCollection,
      convertDataToReferences(req.body.values)
    );
    return res.status(200).json({ docRef });
  }

  return res.status(500).json({ error: 'Method not allowed' });
}

const convertDataToReferences = (values) => {
  return {
    name: values.name,
    price: values.price,
    owner: doc(db, `users/${values.owner}`),
    participants: values.participants.map((participant) =>
      doc(db, `users/${participant}`)
    ),
  };
};
