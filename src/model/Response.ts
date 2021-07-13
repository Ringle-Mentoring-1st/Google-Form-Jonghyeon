import { QuestionType } from './Forms';

export interface Response {
  responserUuid: ResponserUuid;
  questions: QuestionResponse[];
}

export interface QuestionResponse {
  uuid: string;
  type: QuestionType;
  answer: string[] | string;
  textAnswer: string;
}

export type ResponserUuid = string;
