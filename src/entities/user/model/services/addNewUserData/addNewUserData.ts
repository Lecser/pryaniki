import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import axios from 'axios';
import { userActions } from 'entities/user';
import { User } from 'entities/user/model/types/userSchema';
import { ResponseType } from 'shared/types/responseTypes';

import { createAsyncThunk } from '@reduxjs/toolkit';

export const addNewUserData = createAsyncThunk<User, null, ThunkConfig<string>>(
  'user/addNewUserData',
  async (_, thunkAPI) => {
    const { extra, dispatch, rejectWithValue } = thunkAPI;

    const user = {
      companySigDate: new Date().toISOString(),
      companySignatureName: 'empty',
      documentName: 'empty',
      documentStatus: 'empty',
      documentType: 'empty',
      employeeNumber: 'empty',
      employeeSigDate: new Date().toISOString(),
      employeeSignatureName: 'empty'
    };

    try {
      const res = await extra.api.post<ResponseType<User>>(
        `ru/data/v3/testmethods/docs/userdocs/create`,
        user
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
