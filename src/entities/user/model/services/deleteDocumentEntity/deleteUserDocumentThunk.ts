import { ThunkConfig } from 'app/providers/StoreProvider';
import axios from 'axios';
import { ResponseType } from 'shared/types/responseTypes';

import { GridRowId } from '@mui/x-data-grid';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const deleteUserDocumentThunk = createAsyncThunk<GridRowId, GridRowId, ThunkConfig<string>>(
  'user/deleteUserDocumentThunk',
  async (id, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI;
    try {
      const res = await extra.api.post<ResponseType>(
        `ru/data/v3/testmethods/docs/userdocs/delete/${id}`
      );
      if (res.data.error_code !== 0) {
        return rejectWithValue(res.data.error_text);
      }
      return id;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return rejectWithValue(e.message ? e.message : 'Some error occurred');
      }
    }
  }
);
