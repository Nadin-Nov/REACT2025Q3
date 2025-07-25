import type { FC } from 'react';

import { NavMenu } from './NavMenu';

export const Header: FC = () => (
  <header className="header">
    <h1 className="header-title">Get Schwifty</h1>
    <NavMenu />
  </header>
);
