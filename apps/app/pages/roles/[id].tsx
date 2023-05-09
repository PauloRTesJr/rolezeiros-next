import {
  Button,
  ExpenseList,
  Loading,
  Text,
  TextSize,
  Title,
  TitleSize,
} from '@rolezeiros/ui';
import { useRole } from '../../hooks/roles.hook';
import { useRouter } from 'next/router';
import { Expense } from '@rolezeiros/models';
import { MdAddCircleOutline, MdRemoveCircleOutline } from 'react-icons/md';
import { useState } from 'react';
import Link from 'next/link';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '@rolezeiros/firebase';
import Image from 'next/image';

function Role() {
  const router = useRouter();
  const { id } = router.query;
  const { role, isLoading, mutate } = useRole(id as string);
  const [showInfo, setShowInfo] = useState(false);

  const removeExpense = async (expenseId: string) => {
    if (confirm('certeza?')) {
      await deleteDoc(doc(db, `roles/${id}/expenses`, expenseId));
      await mutate(`/api/roles/${id}`);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <>
      <div>
        <Title text={role?.name} size={TitleSize.Large} />
        <div className="flex my-4 h-64 justify-center">
          <Image
            className="p-8 rounded-t-lg object-contain"
            width={400}
            height={300}
            src={role?.image}
            alt={role?.name}
            priority={true}
          />
        </div>
        <div className="p-2 my-4 bg-white rounded-lg border shadow-md sm:p-4 dark:bg-gray-800 dark:border-gray-700">
          <a
            onClick={() => setShowInfo(!showInfo)}
            className="flex items-center gap-2 w-full"
          >
            <Text size={TextSize.Large} text="Mostrar Informações" />{' '}
            {showInfo ? (
              <MdRemoveCircleOutline className="text-gray-500 md:text-xl dark:text-gray-400" />
            ) : (
              <MdAddCircleOutline className="text-gray-500 md:text-xl dark:text-gray-400" />
            )}
          </a>

          <div className={showInfo ? 'visible' : 'hidden'}>
            <Title text="Infos" />
            <Text text={role?.infos} />
            <Title text="Localização" />
            <Text text={role?.location} />
          </div>
        </div>
      </div>
      <div className="my-5">
        <Title text="Gastos" size={TitleSize.Large} />
        <div className="flex gap-2">
          <Link href={`/roles/${id}/add-expense`}>
            <Button
              text="Adicionar Gasto"
              onClick={() => console.log('Adiciona gasto')}
            />
          </Link>
          <Link href={`/roles/${id}/split`}>
            <Button
              text="Dividir entre amiguinhos"
              onClick={() => console.log('Adiciona gasto')}
            />
          </Link>
        </div>
        <div className="p-2 my-4 bg-white rounded-lg border shadow-md sm:p-4 dark:bg-gray-800 dark:border-gray-700">
          <ul
            role="list"
            className="divide-y divide-gray-200 dark:divide-gray-700"
          >
            {role?.expenses?.map((expense: Expense) => (
              <ExpenseList
                expense={expense}
                key={expense.id}
                onRemove={() => removeExpense(expense.id)}
              />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Role;
