import { ThunkConfig } from 'app/providers/StoreProvider';
import { AxiosError, AxiosResponse } from 'axios';
import { handleAsyncServerNetworkError } from 'shared/lib/error-utils/handleAsyncServerError/handleAsyncServerNetworkError';
import { ErrorCode, ResponseType } from 'shared/types/responseTypes';

import { createAsyncThunk } from '@reduxjs/toolkit';

import { User } from '../../types/userSchema';

export const addNewUserDataThunk = createAsyncThunk<User, User, ThunkConfig<string>>(
  'user/addNewUserDataThunk',
  async (userData, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI;
    try {
      const { data: responseData } = await extra.api.post<
        '',
        AxiosResponse<ResponseType<User>>,
        User
      >(`ru/data/v3/testmethods/docs/userdocs/create`, userData);
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
