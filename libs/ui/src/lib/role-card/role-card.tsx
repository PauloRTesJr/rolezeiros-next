import { Role } from '@rolezeiros/models';
import Link from 'next/link';
import Button from '../button/button';

/* eslint-disable-next-line */
export interface RoleCardProps {
  role: Role;
}

export function RoleCard({ role }: RoleCardProps) {
  return (
    <div className="w-full max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
      <img className="p-8 rounded-t-lg" src={role.image} alt={role.name} />
      <div className="px-5 pb-5">
        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {role.name}
        </h5>
        <div className="flex items-center justify-between">
          <div></div>
          <Link href={`/roles/${role.id}`}>
            <Button text="Ver mais" onClick={() => console.log('Ver Mais')} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RoleCard;
