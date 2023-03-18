import axios, { AxiosError } from 'axios';

export const handleAsyncServerNetworkError = (
  e: Error | AxiosError<{ error: string }>,
  rejectWithValue: Function
) => {
  if (axios.isAxiosError(e)) {
    return rejectWithValue(e.response?.data ? e.response.data.error : e.message);
  }
  return rejectWithValue('Some error occurred');
};
