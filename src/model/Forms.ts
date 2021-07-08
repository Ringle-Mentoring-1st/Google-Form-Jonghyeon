export interface Question {
  questionType: QuestionType;
  title: string;
  subtitle: string;
  uuid: string;
  options: Option[];
}

export type QuestionType = 'text' | 'checkbox' | 'radio';

export interface Option {
  text: string;
  uuid: string;
}

export interface Form {
  isCompleted: boolean;
  title: string;
  creator: string;
  createdAt: number;
  editedAt: number;
  questions: Question[];
  uuid?: string;
}
