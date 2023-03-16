import { getToken } from 'features/auth';
import { FC, PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { AppPaths } from './routerConfig';

export const RequiredNonAuth: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  const token = useSelector(getToken);

  if (token) return <Navigate to={AppPaths.app} />;

  return <>{children}</>;
};
