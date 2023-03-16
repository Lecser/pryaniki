import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import axios, { AxiosResponse } from 'axios';
import { loginActions } from 'features/auth/model/slice/loginSlice';
import { AuthData } from 'features/Auth/types/loginSchema';
import { ResponseType } from 'shared/types/responseTypes';

import { createAsyncThunk } from '@reduxjs/toolkit';

interface LoginByUsernameProps {
  username: string;
  password: string;
}

export const loginByUsername = createAsyncThunk<
  AuthData,
  LoginByUsernameProps,
  ThunkConfig<string>
>('login/loginByUsername', async (authData, thunkAPI) => {
  const { extra, dispatch, rejectWithValue } = thunkAPI;
  try {
    const res = await extra.api.post<
      null,
      AxiosResponse<ResponseType<AuthData>>,
      LoginByUsernameProps
    >('ru/data/v3/testmethods/docs/login', authData);
    if (res.data.error_code !== 0) {
      dispatch(loginActions.setError(res.data.error_text));
    } else {
      document.cookie = `token=${res.data.data.token}`;
      dispatch(loginActions.setToken(res.data.data.token));
      return res.data.data;
    }
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return rejectWithValue(e.message ? e.message : 'Some error occurred');
    }
  }
});
