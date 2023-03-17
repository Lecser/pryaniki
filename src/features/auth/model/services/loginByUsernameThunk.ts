import { ThunkConfig } from 'app/providers/StoreProvider';
import axios, { AxiosResponse } from 'axios';
import { ResponseType } from 'shared/types/responseTypes';

import { createAsyncThunk } from '@reduxjs/toolkit';

import { AuthData } from '../../types/loginSchema';

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
    if (res.data.error_code !== 0) {
      return rejectWithValue(res.data.error_text);
    }
    document.cookie = `token=${res.data.data.token}`;
    return res.data.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return rejectWithValue(e.message ? e.message : 'Some error occurred');
    }
  }
});
