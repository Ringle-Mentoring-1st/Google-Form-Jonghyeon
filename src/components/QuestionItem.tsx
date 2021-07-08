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
import TextInput from '../ui/TextInput';
import * as Icon from 'heroicons-react';
import MarkupSwitchByType from './MarkupSwitchByType';

interface QuestionProps {
  question: Question;
  index: number;
}

function QuestionItem({ question, index }: QuestionProps) {
  const form = useAppSelector((state) => state.form.form);

  const dispatch = useAppDispatch();

  const removeQuestionHandler = () => {
    dispatch(removeQuestion({ index: index }));
  };

  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuestionTitle({ newTitle: e.target.value, index: index }));
  };
  const changeSubtitle = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(
      setQuestionSubtitle({ newSubtitle: e.target.value, index: index })
    );
  };

  const questionTypeHandleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value as QuestionType;
    dispatch(setQuestionType({ newType, index }));
  };

  return (
    <QuestionCard>
      <TopWindow>
        <Button size="small" onClick={removeQuestionHandler}>
          <Icon.X size={15} />
        </Button>
        <QuestionIndex>
          {index + 1}번째 질문 <Icon.ChatOutline />
        </QuestionIndex>
      </TopWindow>
      <QuestionContent>
        <QuestionTitleDevider>
          <QuestionTitle>
            <TextInput
              value={question.title}
              onChange={(e) => changeTitle(e)}
              fill
              placeholder="질문 제목을 입력해주세요"
            />
            <TextArea
              value={question.subtitle}
              onChange={(e) => changeSubtitle(e)}
              fill
              placeholder="질문 부제목을 입력해주세요 (선택)"
              style={{ marginTop: 8 }}
            />
          </QuestionTitle>
          <TypeSelect
            value={question.questionType}
            onChange={questionTypeHandleChange}
          >
            <TypeOption value="text">주관식 답변</TypeOption>
            <TypeOption value="radio">단일 선택</TypeOption>
            <TypeOption value="checkbox">다중 선택</TypeOption>
          </TypeSelect>
        </QuestionTitleDevider>
        {/* 질문 타입별 마크업 */}
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

const QuestionCard = styled.li`
  background: white;
  border-radius: 16px;
  margin-bottom: 16px;
  box-shadow: 0px 12px 32px -12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const QuestionContent = styled.div`
  padding: 8px 16px 16px 16px;
`;

const QuestionIndex = styled.h3`
  flex: 1;
  text-align: left;
  padding-left: 8px;
`;

const TopWindow = styled.div`
  display: flex;
  flex-direction: row-reverse;
  padding: 16px 16px 0 16px;
`;

const QuestionTitleDevider = styled.div`
  display: flex;
`;

const QuestionTitle = styled.div`
  flex: 1;
`;

const TypeSelect = styled.select`
  appearance: none;
  background-color: white;
  border: 2px solid lightgray;
  border-radius: 16px;
  margin: 0;
  font-family: inherit;
  font-size: inherit;
  cursor: inherit;
  line-height: inherit;
  outline: none;
  height: 40px;
`;
const TypeOption = styled.option`
  appearance: none;
`;
