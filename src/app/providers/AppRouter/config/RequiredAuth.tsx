import { getToken } from 'features/auth';
import { PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { AppPaths } from './routerConfig';

export const RequiredAuth = (props: PropsWithChildren) => {
  const { children } = props;
  const token = useSelector(getToken);

  if (token) return <>{children}</>;

  return <Navigate to={AppPaths.loginPage} />;
};
