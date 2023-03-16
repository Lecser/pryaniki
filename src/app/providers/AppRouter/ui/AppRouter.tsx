import { RequiredNonAuth } from 'app/providers/AppRouter/config/RequiredNonAuth';
import { loginActions } from 'features/auth/model/slice/loginSlice';
import { ErrorPage } from 'pages/ErrorPage';
import { useEffect, useLayoutEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { getCookie } from 'shared/lib/getCookie/getCookie';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { PageLayout } from 'widgets/pageLayout/ui/PageLayout';

import { RequiredAuth } from '../config/RequiredAuth';
import { appRouterConfig } from '../config/routerConfig';

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
  })
);

export const AppRouter = () => {
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    const token = getCookie('token');
    if (token) {
      dispatch(loginActions.setToken(token));
    }
  }, [dispatch]);
  return <RouterProvider router={newRouter} />;
};
