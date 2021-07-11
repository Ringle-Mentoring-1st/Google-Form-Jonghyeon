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
    isCompleted: false,
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
    clearForm: (state) => {
      state.list = initialState.list;
      state.form = initialState.form;
    },
    clearFormList: (state) => {
      state.list = initialState.list;
    },
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
    addOption: (
      state,
      { payload }: PayloadAction<{ indexQuestion: number; newOption: Option }>
    ) => {
      state.form.questions[payload.indexQuestion].options.push(
        payload.newOption
      );
    },
    removeOption: (
      state,
      {
        payload,
      }: PayloadAction<{
        indexQuestion: number;
        optionIndex: number;
        optionUuid: string;
      }>
    ) => {
      state.form.questions[payload.indexQuestion].options.splice(
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
  clearForm,
  clearFormList,
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

export default formSlice.reducer;
