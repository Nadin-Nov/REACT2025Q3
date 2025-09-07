import type { FC, ReactNode } from 'react';

import { Footer } from './Footer/Footer';
import { Header } from './Header/Header';
import styles from './Layout.module.css';

type LayoutProps = {
  children: ReactNode;
};

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
};
