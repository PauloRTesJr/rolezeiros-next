import Header from '../header/header';
import styles from './layout.module.scss';

/* eslint-disable-next-line */
export interface LayoutProps {
  children: React.ReactNode;
}

export function Layout(props: LayoutProps) {
  return (
    <>
      <Header />
      <div className={styles['container']}>{props.children}</div>
    </>
  );
}

export default Layout;
