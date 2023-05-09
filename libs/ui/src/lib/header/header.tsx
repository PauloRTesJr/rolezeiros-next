import Link from 'next/link';
import styles from './header.module.scss';

/* eslint-disable-next-line */
export interface HeaderProps {}

export function Header(props: HeaderProps) {
  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <Link href={'/dashboard'}>
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            Rolezeiros
          </span>
        </Link>
      </div>
    </nav>
  );
}

export default Header;
