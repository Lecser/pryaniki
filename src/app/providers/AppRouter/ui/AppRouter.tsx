import { loginActions } from 'features/auth';
import { ErrorPage } from 'pages/ErrorPage';
import { Suspense, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { getCookie } from 'shared/lib/getCookie/getCookie';
import { useAction } from 'shared/lib/hooks/useActions/useActions';
import { PageLayout } from 'widgets/pageLayout';

import { LinearProgress } from '@mui/material';

import { RequiredAuth } from '../config/RequiredAuth';
import { RequiredNonAuth } from '../config/RequiredNonAuth';
import { appRouterConfig } from '../config/routerConfig';

const newRouter = createBrowserRouter(
  appRouterConfig.map((route) => {
    const element = (
      <Suspense fallback={<LinearProgress color='inherit' />}>
        {route.pageLayout ? <PageLayout>{route.element}</PageLayout> : route.element}
      </Suspense>
    );

    return {
      path: route.path,
      element: route.requiredAuth ? (
        <RequiredAuth>{element}</RequiredAuth>
      ) : (
        <RequiredNonAuth>{element}</RequiredNonAuth>
      ),
      errorElement: <ErrorPage />
    };
  })
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
