import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';

interface FormState {
  isLoading: boolean;
}

const initialState: FormState = {
  isLoading: false,
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    activateLoading: state => {
      state.isLoading = true;
    },
    deactivateLoading: state => {
      state.isLoading = false;
    },
  },
});

export const { activateLoading, deactivateLoading } = formSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default formSlice.reducer;
