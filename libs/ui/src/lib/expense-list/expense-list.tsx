import { Expense } from '@rolezeiros/models';
import Text from '../text/text';
import { MdDelete } from 'react-icons/md';

/* eslint-disable-next-line */
export interface ExpenseListProps {
  expense: Expense;
  onRemove: () => void;
}

export function ExpenseList({ expense, onRemove }: ExpenseListProps) {
  return (
    <li className="py-1 sm:py-2">
      <div className="flex items-center space-x-4">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
            {expense?.name}
          </p>
          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
            Comprado por: {expense.owner?.name}
          </p>
          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
            Dividido com:{' '}
            {expense.participants?.reduce(
              (acc, curr) => acc + curr.name + ', ',
              ''
            )}
          </p>
        </div>
        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
          <Text text={'R$' + expense.price} />
          <a href="#remove" onClick={onRemove}>
            <MdDelete className="mx-4" size={24} />
          </a>
        </div>
      </div>
    </li>
  );
}

export default ExpenseList;
