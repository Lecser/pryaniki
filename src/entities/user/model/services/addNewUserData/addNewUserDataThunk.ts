import { ThunkConfig } from 'app/providers/StoreProvider';
import { AxiosError, AxiosResponse } from 'axios';
import { handleAsyncServerNetworkError } from 'shared/lib/error-utils/handleAsyncServerError/handleAsyncServerNetworkError';
import { ResponseType } from 'shared/types/responseTypes';

import { createAsyncThunk } from '@reduxjs/toolkit';

import { User } from '../../types/userSchema';

export const addNewUserDataThunk = createAsyncThunk<User, void, ThunkConfig<string>>(
  'user/addNewUserDataThunk',
  async (_, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI;

    const isoDate = new Date().toISOString();
    const userData = {
      companySigDate: isoDate,
      companySignatureName: 'empty',
      documentName: 'empty',
      documentStatus: 'empty',
      documentType: 'empty',
      employeeNumber: 'empty',
      employeeSigDate: isoDate,
      employeeSignatureName: 'empty'
    };

    try {
      const res = await extra.api.post<'', AxiosResponse<ResponseType<User>>, User>(
        `ru/data/v3/testmethods/docs/userdocs/create`,
        userData
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
