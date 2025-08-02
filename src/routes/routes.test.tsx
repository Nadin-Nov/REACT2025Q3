import { describe, it, expect } from 'vitest';

import { AboutPage } from '../pages/AboutPage';
import { MainPage } from '../pages/MainPage';
import { NotFoundPage } from '../pages/NotFoundPage';

import { routes } from './routes';

describe('routes', () => {
  it('should have correct routes configuration', () => {
    expect(routes.length).toBe(3);

    const mainRoute = routes[0];
    expect(mainRoute.path).toBe('/:page/:detailsId?');
    expect(mainRoute.Component).toBe(MainPage);
    expect(mainRoute.exact).toBe(false);

    const aboutRoute = routes[1];
    expect(aboutRoute.path).toBe('/about');
    expect(aboutRoute.Component).toBe(AboutPage);
    expect(aboutRoute.exact).toBeUndefined();

    const notFoundRoute = routes[2];
    expect(notFoundRoute.path).toBe('*');
    expect(notFoundRoute.Component).toBe(NotFoundPage);
    expect(notFoundRoute.exact).toBeUndefined();
  });
});
