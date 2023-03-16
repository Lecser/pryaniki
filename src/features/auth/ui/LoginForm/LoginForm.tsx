import { getLoginError } from 'features/Auth/model/selectors/getLoginError/getLoginError';
import { getLoginIsLoading } from 'features/Auth/model/selectors/getLoginIsLoading/getLoginIsLoading';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ErrorSnackbar } from 'shared/ui/ErrorSnackbar';
import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
  Button,
  CircularProgress,
  Container,
  IconButton,
  InputAdornment,
  Stack,
  styled,
  TextField,
  Typography
} from '@mui/material';

import { loginByUsername } from '../../model/services/loginByUsername';

export interface LoginForm {
  username: string;
  password: string;
}

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const Schema = yup.object({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required')
  });

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<LoginForm>({
    defaultValues: {
      username: '',
      password: ''
    },
    mode: 'onBlur',
    resolver: yupResolver(Schema)
  });

  const loginIsLoading = useSelector(getLoginIsLoading);
  const error = useSelector(getLoginError);

  const onSubmit: SubmitHandler<LoginForm> = (data) => {
    dispatch(loginByUsername(data));
  };

  const BlackButton = styled(Button)({
    backgroundColor: '#212121',
    color: 'white',
    height: '40px',
    '&:hover': {
      backgroundColor: '#424242'
    },
    '&:disabled': {
      backgroundColor: '#424242',
      color: 'white'
    }
  });

  return (
    <Container maxWidth='xs'>
      <ErrorSnackbar error={error} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography fontWeight='bold' textAlign='center' component='p' variant='h5'>
          Sign in
        </Typography>
        <Stack marginBottom='20px' direction='column'>
          <Controller
            name='username'
            control={control}
            render={({ field }) => (
              <TextField
                size='small'
                error={!!errors.username}
                helperText={errors?.username?.message}
                label='Имя пользователя'
                variant='outlined'
                margin='normal'
                fullWidth
                {...field}
              />
            )}
          />
          <Controller
            name='password'
            control={control}
            render={({ field }) => (
              <TextField
                size='small'
                type={showPassword ? 'text' : 'password'}
                error={!!errors.password}
                helperText={errors?.password?.message}
                label='Пароль'
                variant='outlined'
                margin='normal'
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton onClick={handleClickShowPassword}>
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                {...field}
              />
            )}
          />
        </Stack>
        <BlackButton disabled={loginIsLoading} type='submit' fullWidth variant='contained'>
          {loginIsLoading ? <CircularProgress size={28} color='inherit' /> : 'sign in'}
        </BlackButton>
      </form>
    </Container>
  );
};
