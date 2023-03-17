import { userActions } from 'entities/user';
import { loginActions } from 'features/auth';
import { PropsWithChildren } from 'react';
import { useActions } from 'shared/lib/hooks/useActions/useActions';

import { Button } from '@mui/material';

export const LogoutButton = (props: PropsWithChildren) => {
  const { children } = props;
  const actions = { ...userActions, ...loginActions };
  const { clearUserData, setToken } = useActions(actions);

  const onLogoutClick = () => {
    setToken('');
    clearUserData();
    document.cookie = `token=;expires=${new Date(0)}`;
  };

  return (
    <Button onClick={onLogoutClick} color='inherit'>
      {children}
    </Button>
  );
};
