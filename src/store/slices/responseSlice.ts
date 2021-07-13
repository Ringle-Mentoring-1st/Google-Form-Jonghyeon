import { QuestionType } from './../../model/Forms';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Response, ResponserUuid } from '../../model/Response';

const initialState: Response = {
  responserUuid: '',
  questions: [],
};

export const responseSlice = createSlice({
  name: 'response',
  initialState,
  reducers: {
    clearResponse: (state) => {
      state.questions = initialState.questions;
    },
    setResponse: (state, { payload }: PayloadAction<Response>) => {
      state.questions = payload.questions;
      state.responserUuid = payload.responserUuid;
    },
    setResponserUuid: (state, { payload }: PayloadAction<ResponserUuid>) => {
      if (!state.responserUuid) {
        state.responserUuid = payload;
      }
    },
    setTextAnswer: (
      state,
      {
        payload,
      }: PayloadAction<{
        questionUuid: string;
        text: string;
      }>
    ) => {
      const { questionUuid, text } = payload;
      const indexQuestion = state.questions.findIndex(
        (question) => question.uuid === questionUuid
      );
      state.questions[indexQuestion].textAnswer = text;
    },
    setOptionAnswer: (
      state,
      {
        payload,
      }: PayloadAction<{
        questionUuid: string;
        optionUuid: string;
        questionType: QuestionType;
      }>
    ) => {
      const { questionUuid, optionUuid, questionType } = payload;
      const indexQuestion = state.questions.findIndex(
        (question) => question.uuid === questionUuid
      );

      switch (questionType) {
        case 'radio':
          state.questions[indexQuestion].answer = [optionUuid];
          break;
        case 'checkbox':
          const answer = state.questions[indexQuestion].answer as string[];
          const indexOptionUuid = answer.indexOf(optionUuid);
          if (indexOptionUuid === -1) {
            answer.push(optionUuid);
          } else {
            answer.splice(indexOptionUuid, 1);
          }
          break;

        default:
          break;
      }
    },
  },
});

export const {
  clearResponse,
  setResponse,
  setResponserUuid,
  setTextAnswer,
  setOptionAnswer,
} = responseSlice.actions;

export default responseSlice.reducer;
