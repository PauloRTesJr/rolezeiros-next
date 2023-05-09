import { useRouter } from 'next/router';
import { Loading, Title, Text, Button } from '@rolezeiros/ui';
import { useSplit } from '../../../hooks/split.hook';
import Link from 'next/link';

function Split() {
  const router = useRouter();
  const { id } = router.query;
  const { split, isLoading, isError } = useSplit(id as string);

  if (isLoading) return <Loading />;
  if (isError) return <Title text="Falha ao carregar usuários" />;

  return (
    <>
      <Link href={`/roles/${id}`}>
        <Button
          text="Voltar"
          onClick={() => {
            console.log('Voltando...');
          }}
        />
      </Link>
      {Object.values(split).map((splitValue) => (
        <>
          <Title key={splitValue.user.id} text={splitValue.user.name} />
          <ul
            role="list"
            className="divide-y divide-gray-200 dark:divide-gray-700"
          >
            {Object.entries(splitValue.share).map(([key, share], i) => {
              if (share !== 0) {
                return (
                  <li key={i} className="py-1 sm:py-2">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                          {key}
                        </p>
                      </div>
                      <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        <p
                          className={
                            'font-light ' +
                            (share > 0 ? 'text-green-500' : 'text-red-500')
                          }
                        >
                          {'R$' + share.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              }
              return null;
            })}
          </ul>
        </>
      ))}
    </>
  );
}

export default Split;
