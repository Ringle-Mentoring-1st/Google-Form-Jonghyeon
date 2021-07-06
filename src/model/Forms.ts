export type Questions = Question[];

export interface Question {
  questionType: 'text' | 'checkbox' | 'radio';
  title: string;
  subtitle: string;
  uuid: string;
  options?: Option[] | [];
}

export interface Option {
  text: string;
  uuid: string;
}

export interface Form {
  title: string;
  creator: string;
  createdAt: number;
  editedAt: number;
  questions: Questions;
  uuid?: string;
}
