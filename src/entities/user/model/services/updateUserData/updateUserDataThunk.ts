import { ThunkConfig } from 'app/providers/StoreProvider';
import axios, { AxiosResponse } from 'axios';
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
