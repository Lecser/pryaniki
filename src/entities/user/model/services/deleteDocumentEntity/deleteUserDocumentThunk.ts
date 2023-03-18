import { ThunkConfig } from 'app/providers/StoreProvider';
import { AxiosError } from 'axios';
import { handleAsyncServerNetworkError } from 'shared/lib/error-utils/handleAsyncServerError/handleAsyncServerNetworkError';
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
      if (res.data.error_code !== 0 && res.data.error_text) {
        return rejectWithValue(res.data.error_text);
      }
      return id;
    } catch (e) {
      const err = e as Error | AxiosError;
      return handleAsyncServerNetworkError(err, rejectWithValue);
    }
  }
);
