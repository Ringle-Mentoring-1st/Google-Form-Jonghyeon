import { Form, Option, Question, QuestionType } from './../../model/Forms';
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
    removeQuestion: (state, { payload }: PayloadAction<{ index: number }>) => {
      state.form.questions = state.form.questions.filter(
        (q, index) => index !== payload.index
      );
    },
    setQuestionTitle: (
      state,
      { payload }: PayloadAction<{ newTitle: string; index: number }>
    ) => {
      state.form.questions[payload.index].title = payload.newTitle;
    },
    setQuestionSubtitle: (
      state,
      { payload }: PayloadAction<{ newSubtitle: string; index: number }>
    ) => {
      state.form.questions[payload.index].subtitle = payload.newSubtitle;
    },
    setQuestionType: (
      state,
      { payload }: PayloadAction<{ newType: QuestionType; index: number }>
    ) => {
      state.form.questions[payload.index].questionType = payload.newType;
    },
    addOption: (state, { payload }: PayloadAction<number>) => {
      const newOption = { text: '', uuid: '' };
      state.form.questions[payload].options.push(newOption);
    },
    removeOption: (
      state,
      { payload }: PayloadAction<{ questionIndex: number; optionIndex: number }>
    ) => {
      state.form.questions[payload.questionIndex].options.splice(
        payload.optionIndex,
        1
      );
    },
    setOptionText: (
      state,
      {
        payload,
      }: PayloadAction<{
        newText: string;
        index: number;
        optionIndex: number;
      }>
    ) => {
      state.form.questions[payload.index].options[payload.optionIndex].text =
        payload.newText;
    },
  },
});

export const {
  getFormList,
  addForm,
  setForm,
  setFormTitle,
  addQuestion,
  removeQuestion,
  setQuestionTitle,
  setQuestionSubtitle,
  setQuestionType,
  addOption,
  removeOption,
  setOptionText,
} = formSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default formSlice.reducer;
