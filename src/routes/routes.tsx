import type { ComponentType } from 'react';

import { AboutPage } from '../pages/AboutPage';
import { MainPage } from '../pages/MainPage';
import { NotFoundPage } from '../pages/NotFoundPage';

type RouteType = {
  path: string;
  Component: ComponentType;
  exact?: boolean;
};

export const routes: RouteType[] = [
  { path: '/', Component: MainPage, exact: true },
  { path: '/about', Component: AboutPage },
  { path: '*', Component: NotFoundPage },
];
