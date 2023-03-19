import { ThunkConfig } from 'app/providers/StoreProvider';
import { AxiosError } from 'axios';
import { $api, createSetTokenInterceptor } from 'shared/api/api/api';
import { handleAsyncServerNetworkError } from 'shared/lib/error-utils/handleAsyncServerError/handleAsyncServerNetworkError';
import { getCookie } from 'shared/lib/getCookie/getCookie';
import { ErrorCode, ResponseType } from 'shared/types/responseTypes';

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
      const { data: responseData } = await extra.api.get<ResponseType<User[]>>(
        'ru/data/v3/testmethods/docs/userdocs/get'
      );
      if (responseData.error_code !== ErrorCode.OK && responseData.error_text) {
        return rejectWithValue(responseData.error_text);
      }
      return responseData.data;
    } catch (e) {
      const err = e as Error | AxiosError;
      return handleAsyncServerNetworkError(err, rejectWithValue);
    }
  }
);
