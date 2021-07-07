import { Form, Question } from './../../model/Forms';
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
    setForm: (state, { payload }: PayloadAction<Form>) => {
      state.form = { ...payload };
    },
    setFormTitle: (state, { payload }: PayloadAction<string>) => {
      state.form.title = payload;
    },
    addQuestion: (state, { payload }: PayloadAction<Question>) => {
      state.form.questions.push(payload);
    },
    setQuestionTitle: (
      state,
      { payload }: PayloadAction<{ newTitle: string; index: number }>
    ) => {
      state.form.questions[payload.index].title = payload.newTitle;
    },
  },
});

export const {
  getFormList,
  addForm,
  setForm,
  setFormTitle,
  addQuestion,
  setQuestionTitle,
} = formSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default formSlice.reducer;
