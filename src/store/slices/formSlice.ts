import { Form } from './../../model/Forms';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';

interface FormState {
  list: Form[];
  form: Form;
}

const initialState: FormState = {
  list: [],
  form: {
    title: '',
    createdAt: 0,
    creator: '',
    editedAt: 0,
    questions: [],
    uuid: '',
  },
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    getFormList: (state, { payload }: PayloadAction<Form[]>) => {
      const sorted = payload.sort((a, b) => b.editedAt - a.editedAt);
      state.list = [...sorted];
    },
    addForm: (state, { payload }: PayloadAction<Form>) => {
      state.list = [...state.list, payload];
    },
  },
});

export const { getFormList, addForm } = formSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default formSlice.reducer;
