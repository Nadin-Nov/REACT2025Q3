import type { FC } from 'react';
import { NavLink } from 'react-router-dom';

export const NavMenu: FC = () => (
  <nav>
    <NavLink to="/" end className={({ isActive }) => (isActive ? 'active-link' : undefined)}>
      Main
    </NavLink>
    <NavLink to="/about" className={({ isActive }) => (isActive ? 'active-link' : undefined)}>
      About
    </NavLink>
  </nav>
);
