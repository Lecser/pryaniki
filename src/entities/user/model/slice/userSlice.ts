import { createSlice } from '@reduxjs/toolkit';

import { addNewUserDataThunk } from '../services/addNewUserData/addNewUserDataThunk';
import { deleteUserDocumentThunk } from '../services/deleteDocumentEntity/deleteUserDocumentThunk';
import { getUserDataThunk } from '../services/getUserData/getUserDataThunk';
import { updateUserDataThunk } from '../services/updateUserData/updateUserDataThunk';
import { UserSchema } from '../types/userSchema';

const initialState: UserSchema = {
  userData: [],
  error: undefined,
  isLoading: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUserData: (state) => {
      state.userData = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserDataThunk.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(getUserDataThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload;
      })
      .addCase(getUserDataThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(updateUserDataThunk.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(updateUserDataThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = state.userData.map((el) =>
          el.id === action.payload.id ? { ...action.payload } : el
        );
      })
      .addCase(updateUserDataThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(addNewUserDataThunk.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(addNewUserDataThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData.push(action.payload);
      })
      .addCase(addNewUserDataThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(deleteUserDocumentThunk.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(deleteUserDocumentThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = state.userData.filter((el) => el.id !== action.payload);
      })
      .addCase(deleteUserDocumentThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
