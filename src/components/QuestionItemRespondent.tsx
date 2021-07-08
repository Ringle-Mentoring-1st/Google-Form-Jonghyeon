import { ChangeEvent } from 'react';
import styled from 'styled-components';
import { Question, QuestionType } from '../model/Forms';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  removeQuestion,
  setQuestionSubtitle,
  setQuestionTitle,
  setQuestionType,
} from '../store/slices/formSlice';
import Button from '../ui/Button';
import TextArea from '../ui/TextArea';
import * as Icon from 'heroicons-react';
import MarkupSwitchByType from './MarkupSwitchByType';
import {
  QuestionCard,
  QuestionContent,
  QuestionIndex,
  QuestionTitle,
  QuestionTitleDevider,
  TopWindow,
} from '../ui/StyledComponents';

interface QuestionProps {
  question: Question;
  index: number;
}

function QuestionItem({ question, index }: QuestionProps) {
  return (
    <QuestionCard>
      <TopWindow>
        <QuestionIndex>
          {index + 1}번째 질문 <Icon.ChatOutline />
        </QuestionIndex>
      </TopWindow>
      <QuestionContent>
        <QuestionTitleDevider>
          <QuestionTitle>
            <h2>{question.title}</h2>
            <h4>{question.subtitle}</h4>
          </QuestionTitle>
        </QuestionTitleDevider>
        <MarkupSwitchByType
          question={question}
          index={index}
          style={{ marginTop: 6 }}
        />
      </QuestionContent>
    </QuestionCard>
  );
}

export default QuestionItem;
