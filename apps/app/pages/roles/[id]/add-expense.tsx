import { Loading, Text, Title } from '@rolezeiros/ui';
import { Formik, FormikHelpers, Field, Form } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { User } from '@rolezeiros/models';
import { useUsers } from '../../../hooks/users.hook';
import axios from 'axios';

interface Values {
  name: string;
  price: number;
  owner: string;
  participants: string[];
}

function Role() {
  const router = useRouter();
  const { id } = router.query;
  const { users, isLoading, isError } = useUsers();

  const onFormSubmit = async (values: Values) => {
    await axios.post(`/api/roles/${id}/add-expense`, {
      values,
    });
    router.push(`/roles/${id}`);
  };

  if (isLoading) return <Loading />;
  if (isError) return <Title text="Falha ao carregar usuários" />;

  return (
    <>
      <Formik
        initialValues={{ name: '', price: 0, owner: '', participants: [] }}
        onSubmit={async (
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          await onFormSubmit(values);
          setSubmitting(false);
        }}
      >
        <Form>
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Nome
            </label>
            <Field
              name="name"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="price"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Preço (Ex: R$32.54)
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                R$
              </span>
              <Field
                name="price"
                id="price"
                type="number"
                required
                className="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Bonnie Green"
              />
            </div>
          </div>
          <div className="mb-6">
            <label
              htmlFor="owner"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Comprador
            </label>
            <Field
              as="select"
              id="owner"
              name="owner"
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option disabled></option>
              {users.map((user: User) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </Field>
          </div>
          <div className="mb-6">
            <Title text="Quem vai usar" />
            <div
              role="group"
              aria-labelledby="checkbox-group"
              className="flex flex-wrap gap-y-4 gap-x-8"
            >
              {users.map((user: User) => (
                <div key={user.id} className="flex items-center mb-4">
                  <Field
                    type="checkbox"
                    name="participants"
                    id={`checkbox-${user.id}`}
                    value={user.id}
                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor={`checkbox-${user.id}`}
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    {user.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col-reverse justify-end gap-6 items-center md:flex-row">
            <Link href={`/roles/${id}`}>
              <Text text="Cancelar" />
            </Link>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Salvar
            </button>
          </div>
        </Form>
      </Formik>
    </>
  );
}

export default Role;
