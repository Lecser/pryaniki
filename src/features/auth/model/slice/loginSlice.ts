import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { LoginSchema } from '../../types/loginSchema';
import { loginByUsernameThunk } from '../services/loginByUsernameThunk';

const initialState: LoginSchema = {
  token: '',
  isLoading: false,
  error: null
};
export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    }
  },
  extraReducers: (builder) =>
    builder
      .addCase(loginByUsernameThunk.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(loginByUsernameThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
      })
      .addCase(loginByUsernameThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
});

export const { actions: loginActions } = loginSlice;
export const { reducer: loginReducer } = loginSlice;
