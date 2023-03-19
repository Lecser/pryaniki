import { ThunkConfig } from 'app/providers/StoreProvider';
import { AxiosError } from 'axios';
import { handleAsyncServerNetworkError } from 'shared/lib/error-utils/handleAsyncServerError/handleAsyncServerNetworkError';
import { ErrorCode, ResponseType } from 'shared/types/responseTypes';

import { GridRowId } from '@mui/x-data-grid';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const deleteUserDocumentThunk = createAsyncThunk<GridRowId, GridRowId, ThunkConfig<string>>(
  'user/deleteUserDocumentThunk',
  async (id, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI;
    try {
      const { data: responseData } = await extra.api.post<ResponseType>(
        `ru/data/v3/testmethods/docs/userdocs/delete/${id}`
      );
      if (responseData.error_code !== ErrorCode.OK && responseData.error_text) {
        return rejectWithValue(responseData.error_text);
      }
      return id;
    } catch (e) {
      const err = e as Error | AxiosError;
      return handleAsyncServerNetworkError(err, rejectWithValue);
    }
  }
);
