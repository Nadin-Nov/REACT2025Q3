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
  { path: '/:page/:detailsId?', Component: MainPage, exact: false },
  { path: '/about', Component: AboutPage },
  { path: '*', Component: NotFoundPage },
];
