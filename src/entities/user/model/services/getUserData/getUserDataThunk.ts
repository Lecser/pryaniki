import { ThunkConfig } from 'app/providers/StoreProvider';
import axios from 'axios';
import { $api, createSetTokenInterceptor } from 'shared/api/api/api';
import { getCookie } from 'shared/lib/getCookie/getCookie';
import { ResponseType } from 'shared/types/responseTypes';

import { createAsyncThunk } from '@reduxjs/toolkit';

import { User } from '../../types/userSchema';

export const getUserDataThunk = createAsyncThunk<User[], undefined, ThunkConfig<string>>(
  'user/getUserDataThunk',
  async (_, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI;
    const token = getCookie('token');
    const setToken = createSetTokenInterceptor('x-auth', token);
    $api.interceptors.request.use(setToken);

    try {
      const res = await extra.api.get<ResponseType<User[]>>(
        'ru/data/v3/testmethods/docs/userdocs/get'
      );
      if (res.data.error_code !== 0) {
        return rejectWithValue(res.data.error_text);
      }
      return res.data.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return rejectWithValue(e.message ? e.message : 'Some error occurred');
      }
    }
  }
);
