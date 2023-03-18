import { ThunkConfig } from 'app/providers/StoreProvider';
import { AxiosError } from 'axios';
import { $api, createSetTokenInterceptor } from 'shared/api/api/api';
import { handleAsyncServerNetworkError } from 'shared/lib/error-utils/handleAsyncServerError/handleAsyncServerNetworkError';
import { getCookie } from 'shared/lib/getCookie/getCookie';
import { ResponseType } from 'shared/types/responseTypes';

import { createAsyncThunk } from '@reduxjs/toolkit';

import { User } from '../../types/userSchema';

export const getUserDataThunk = createAsyncThunk<User[], void, ThunkConfig<string>>(
  'user/getUserDataThunk',
  async (_, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI;
    const token = getCookie('token');
    if (token) {
      const setToken = createSetTokenInterceptor('x-auth', token);
      $api.interceptors.request.use(setToken);
    }
    try {
      const res = await extra.api.get<ResponseType<User[]>>(
        'ru/data/v3/testmethods/docs/userdocs/get'
      );
      if (res.data.error_code !== 0 && res.data.error_text) {
        return rejectWithValue(res.data.error_text);
      }
      return res.data.data;
    } catch (e) {
      const err = e as Error | AxiosError;
      return handleAsyncServerNetworkError(err, rejectWithValue);
    }
  }
);
