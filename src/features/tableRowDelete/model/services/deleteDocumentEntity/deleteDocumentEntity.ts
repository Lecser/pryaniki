import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import axios from 'axios';
import { userActions } from 'entities/user';
import { ResponseType } from 'shared/types/responseTypes';

import { GridRowId } from '@mui/x-data-grid';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const deleteDocumentEntity = createAsyncThunk<null, GridRowId, ThunkConfig<string>>(
  'user/deleteDocumentEntity',
  async (id, thunkAPI) => {
    const { extra, dispatch, rejectWithValue } = thunkAPI;
    try {
      const res = await extra.api.post<ResponseType>(
        `ru/data/v3/testmethods/docs/userdocs/delete/${id}`
      );
      if (res.data.error_code !== 0) {
        dispatch(userActions.setError(res.data.error_text));
      } else {
        dispatch(userActions.deleteUser(id));
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return rejectWithValue(e.message ? e.message : 'Some error occurred');
      }
    }
  }
);
