import { db } from '@rolezeiros/firebase';
import { Role, User } from '@rolezeiros/models';
import styles from './index.module.scss';
import { Button, Loading, RoleCard, UserCard } from '@rolezeiros/ui';
import { doc, deleteDoc } from 'firebase/firestore';
import { SWRConfig } from 'swr';
import { collectionFetcher } from '../../helpers/fetcher';
import { useRoles } from '../../hooks/roles.hook';
import { useUsers } from '../../hooks/users.hook';

export async function getServerSideProps() {
  const users = await collectionFetcher('users');

  return {
    props: {
      fallback: {
        users: users,
      },
    },
  };
}

export function Dashboard({ fallback }) {
  const { users, isError, isLoading, mutate } = useUsers();
  const { roles } = useRoles();
  const removeUser = async (userId: string) => {
    if (confirm('certeza?')) {
      await deleteDoc(doc(db, 'users', userId));
      mutate(users.filter((user: User) => user.id !== userId));
    }
  };

  if (isError) return <div>failed to load users</div>;
  if (isLoading) return <Loading />;

  return (
    <SWRConfig value={{ fallback }}>
      <div className={styles['container']}>
        <div className={styles.buttons}>
          <Button
            onClick={() => console.log('Adiciona amiguinho')}
            text="Adicionar amiguinho"
          />
          <Button
            onClick={() => console.log('Adiciona comida')}
            text="Adicionar Comida"
          />
        </div>
        <h1 className="text-4xl text-sky-400 font-bold">Migos</h1>
        <div className="flex gap-2 py-2 overflow-x-auto">
          {users?.map((user: User) => (
            <UserCard
              key={user.id}
              user={user}
              onRemove={() => removeUser(user.id)}
            />
          ))}
        </div>
        <h1 className="text-4xl text-sky-400 font-bold">Roles</h1>
        <div className="flex flex-col md:flex-row gap-2">
          {roles?.map((role: Role) => (
            <RoleCard key={role.id} role={role} />
          ))}
        </div>
      </div>
    </SWRConfig>
  );
}

export default Dashboard;
