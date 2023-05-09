import { DocumentReference, getDoc } from 'firebase/firestore';
import { Expense, ExpenseDocument, User } from '@rolezeiros/models';

export const getOwner = async (ownerRef: DocumentReference) => {
  const ownerDoc = await getDoc(ownerRef);
  const ownerData = Object.assign({ id: ownerDoc.id }, ownerDoc.data() as User);

  return ownerData;
};

export const getParticipants = async (participantsRef: DocumentReference[]) => {
  const participantsDocsPromise = participantsRef.map((participant) =>
    getDoc(participant)
  );
  const participantsDocs = await Promise.all(participantsDocsPromise);

  const participantsData = participantsDocs.map((participantDoc) =>
    Object.assign({ id: participantDoc.id }, participantDoc.data() as User)
  );

  return participantsData;
};

export const mapExpensesToPromises = (expenses: ExpenseDocument[]) => {
  return expenses.map(async (expense: ExpenseDocument) => {
    return {
      ...expense,
      owner: await getOwner(expense.owner),
      participants: await getParticipants(expense.participants),
    } as Expense;
  });
};
