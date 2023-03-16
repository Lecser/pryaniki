import { addNewUserData } from 'entities/user';
import { updateUserData } from 'entities/user/model/services/updateUserData/updateUserData';

import { GridRowId } from '@mui/x-data-grid';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getUserData } from '../services/getUserData/getUserData';
import { UserSchema } from '../types/userSchema';

const initialState: UserSchema = {
  userData: [],
  error: null,
  isLoading: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUserData: (state) => {
      state.userData = [];
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    deleteUser: (state, action: PayloadAction<GridRowId>) => {
      state.userData = state.userData.filter((el) => el.id !== action.payload);
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserData.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload;
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(updateUserData.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = state.userData.map((el) =>
          el.id === action.payload.id ? { ...action.payload } : el
        );
      })
      .addCase(updateUserData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(addNewUserData.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(addNewUserData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData.push(action.payload);
      })
      .addCase(addNewUserData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
