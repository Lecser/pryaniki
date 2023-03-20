import { loginActions } from 'features/auth';
import { ErrorPage } from 'pages/ErrorPage';
import { Suspense, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { cookie } from 'shared/lib/cookie/cookie';
import { useActions } from 'shared/lib/hooks/useActions/useActions';
import { PageLayout } from 'widgets/PageLayout';

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
  const { setToken } = useActions(loginActions);

  useEffect(() => {
    const token = cookie.get('token');
    if (token) {
      setToken(token);
    }
  }, [setToken]);
  return <RouterProvider router={newRouter} />;
};
