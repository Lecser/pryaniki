import { loginActions } from 'features/auth';
import { ErrorPage } from 'pages/ErrorPage';
import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { getCookie } from 'shared/lib/getCookie/getCookie';
import { useAction } from 'shared/lib/hooks/useActions/useActions';
import { PageLayout } from 'widgets/pageLayout';

import { RequiredAuth } from '../config/RequiredAuth';
import { RequiredNonAuth } from '../config/RequiredNonAuth';
import { AppPaths, appRouterConfig } from '../config/routerConfig';

const newRouter = createBrowserRouter(
  appRouterConfig.map((route) => {
    const element = route.pageLayout ? <PageLayout>{route.element}</PageLayout> : route.element;

    return {
      path: route.path,
      element: route.requiredAuth ? (
        <RequiredAuth>{element}</RequiredAuth>
      ) : (
        <RequiredNonAuth>{element}</RequiredNonAuth>
      ),
      errorElement: <ErrorPage />
    };
  }),
  { basename: '/React' }
);

export const AppRouter = () => {
  const { setToken } = useAction(loginActions);

  useEffect(() => {
    const token = getCookie('token');
    if (token) {
      setToken(token);
    }
  }, [setToken]);
  return <RouterProvider router={newRouter} />;
};
