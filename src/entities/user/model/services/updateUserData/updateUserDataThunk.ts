import { ThunkConfig } from 'app/providers/StoreProvider';
import { AxiosError, AxiosResponse } from 'axios';
import { handleAsyncServerNetworkError } from 'shared/lib/error-utils/handleAsyncServerError/handleAsyncServerNetworkError';
import { ResponseType } from 'shared/types/responseTypes';

import { GridRowModel } from '@mui/x-data-grid';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { User } from '../../types/userSchema';

export const updateUserDataThunk = createAsyncThunk<User, GridRowModel<User>, ThunkConfig<string>>(
  'user/updateUserDataThunk',
  async (userUpdatedData, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI;

    try {
      const res = await extra.api.post<'', AxiosResponse<ResponseType<User>>, GridRowModel<User>>(
        `ru/data/v3/testmethods/docs/userdocs/set/${userUpdatedData.id}`,
        userUpdatedData
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
