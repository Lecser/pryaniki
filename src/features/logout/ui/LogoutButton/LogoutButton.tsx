import { userActions } from 'entities/user';
import { loginActions } from 'features/auth/model/slice/loginSlice';
import { PropsWithChildren } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';

import { Button } from '@mui/material';

export const LogoutButton = (props: PropsWithChildren) => {
  const { children } = props;

  const dispatch = useAppDispatch();
  const onLogoutClick = () => {
    dispatch(loginActions.setToken(''));
    dispatch(userActions.clearUserData());
    document.cookie = `token=;expires=${new Date(0)}`;
  };

  return (
    <Button onClick={onLogoutClick} color='inherit'>
      {children}
    </Button>
  );
};
