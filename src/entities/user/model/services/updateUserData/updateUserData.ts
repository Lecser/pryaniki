import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import axios from 'axios';
import { userActions } from 'entities/user';
import { User } from 'entities/user/model/types/userSchema';
import { ResponseType } from 'shared/types/responseTypes';

import { GridRowModel } from '@mui/x-data-grid';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const updateUserData = createAsyncThunk<User, GridRowModel, ThunkConfig<string>>(
  'user/updateUserData',
  async (userUpdatedData, thunkAPI) => {
    const { extra, dispatch, rejectWithValue } = thunkAPI;
    try {
      const res = await extra.api.post<ResponseType<User>>(
        `ru/data/v3/testmethods/docs/userdocs/set/${userUpdatedData.id}`,
        userUpdatedData
      );
      if (res.data.error_code !== 0) {
        dispatch(userActions.setError(res.data.error_text));
      } else {
        return res.data.data;
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return rejectWithValue(e.message ? e.message : 'Some error occurred');
      }
    }
  }
);
