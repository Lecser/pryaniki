import { loginByUsername } from 'features/Auth/model/services/loginByUsername';
import { LoginSchema } from 'features/Auth/types/loginSchema';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    }
  },
  extraReducers: (builder) =>
    builder
      .addCase(loginByUsername.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(loginByUsername.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(loginByUsername.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
});

export const { actions: loginActions } = loginSlice;
export const { reducer: loginReducer } = loginSlice;
