import { User } from '@rolezeiros/models';
import Button, { ButtonType } from '../button/button';

export interface UserCardProps {
  user: User;
  onRemove: () => void;
}

export function UserCard({ user, onRemove }: UserCardProps) {
  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col items-center p-4">
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {user.name}
        </h5>
        <div className="flex mt-4 space-x-3 md:mt-6">
          <Button type={ButtonType.Dark} onClick={onRemove} text="Remover" />
        </div>
      </div>
    </div>
  );
}

export default UserCard;
