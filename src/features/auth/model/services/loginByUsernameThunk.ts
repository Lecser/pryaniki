import { ThunkConfig } from 'app/providers/StoreProvider';
import { AxiosError, AxiosResponse } from 'axios';
import { cookie } from 'shared/lib/cookie/cookie';
import { handleAsyncServerNetworkError } from 'shared/lib/error-utils/handleAsyncServerError/handleAsyncServerNetworkError';
import { ErrorCode, ResponseType } from 'shared/types/responseTypes';

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
    const { data: responseData } = await extra.api.post<
      '',
      AxiosResponse<ResponseType<AuthData>>,
      LoginByUsernameProps
    >('ru/data/v3/testmethods/docs/login', authData);
    if (responseData.error_code !== ErrorCode.OK && responseData.error_text) {
      return rejectWithValue(responseData.error_text);
    }
    cookie.set('token', responseData.data.token, 30);
    return responseData.data;
  } catch (e) {
    const err = e as Error | AxiosError;
    return handleAsyncServerNetworkError(err, rejectWithValue);
  }
});
