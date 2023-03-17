import { LoginPage } from 'pages/LoginPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { TablePage } from 'pages/TablePage';
import { ReactNode } from 'react';

export const enum AppPaths {
  'app' = '/',
  'loginPage' = '/loginPage',
  'page404' = '*'
}

interface AppRouterProps {
  path: AppPaths;
  element: ReactNode;
  pageLayout: boolean;
  requiredAuth?: boolean;
  page404?: boolean;
}

export const appRouterConfig: AppRouterProps[] = [
  {
    path: AppPaths.app,
    element: <TablePage />,
    pageLayout: true,
    requiredAuth: true
  },
  {
    path: AppPaths.loginPage,
    element: <LoginPage />,
    pageLayout: false
  },
  {
    path: AppPaths.page404,
    element: <NotFoundPage />,
    pageLayout: false
  }
];
