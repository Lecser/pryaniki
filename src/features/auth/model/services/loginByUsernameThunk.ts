import { ThunkConfig } from 'app/providers/StoreProvider';
import { AxiosError, AxiosResponse } from 'axios';
import { handleAsyncServerNetworkError } from 'shared/lib/error-utils/handleAsyncServerError/handleAsyncServerNetworkError';
import { setCookie } from 'shared/lib/setCookie/setCookie';
import { ResponseType } from 'shared/types/responseTypes';

import { createAsyncThunk } from '@reduxjs/toolkit';

import { AuthData } from '../types/loginSchema';

interface LoginByUsernameProps {
  username: string;
  password: string;
}

export const loginByUsernameThunk = createAsyncThunk<
  AuthData,
  LoginByUsernameProps,
  ThunkConfig<string>
>('login/loginByUsernameThunk', async (authData, thunkAPI) => {
  const { extra, rejectWithValue } = thunkAPI;
  try {
    const res = await extra.api.post<
      '',
      AxiosResponse<ResponseType<AuthData>>,
      LoginByUsernameProps
    >('ru/data/v3/testmethods/docs/login', authData);
    if (res.data.error_code !== 0 && res.data.error_text) {
      return rejectWithValue(res.data.error_text);
    }
    setCookie('token', res.data.data.token, 30);
    return res.data.data;
  } catch (e) {
    const err = e as Error | AxiosError;
    return handleAsyncServerNetworkError(err, rejectWithValue);
  }
});
