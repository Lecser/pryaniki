import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { loginValidationSchema } from 'shared/config/loginValidationSchema';
import { useActions } from 'shared/lib/hooks/useActions/useActions';
import { ErrorSnackbar } from 'shared/ui/ErrorSnackbar/ErrorSnackbar';
import { PrimaryButton } from 'shared/ui/PrimaryButton/PrimaryButton';

import { yupResolver } from '@hookform/resolvers/yup';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
  CircularProgress,
  Container,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography
} from '@mui/material';

import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { loginByUsernameThunk } from '../../model/services/loginByUsernameThunk';

export interface InputsType {
  username: string;
  password: string;
}

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const loginIsLoading = useSelector(getLoginIsLoading);
  const error = useSelector(getLoginError);
  const actions = { loginByUsername: loginByUsernameThunk };
  const { loginByUsername } = useActions(actions);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<InputsType>({
    defaultValues: {
      username: '',
      password: ''
    },
    mode: 'onBlur',
    resolver: yupResolver(loginValidationSchema)
  });

  const onSubmit: SubmitHandler<InputsType> = (data) => {
    loginByUsername(data);
  };

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
                label='Username'
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
                label='Password'
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
        <PrimaryButton disabled={loginIsLoading} type='submit' fullWidth variant='contained'>
          {loginIsLoading ? <CircularProgress size={28} color='inherit' /> : 'sign in'}
        </PrimaryButton>
      </form>
    </Container>
  );
};
