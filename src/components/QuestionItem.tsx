import { ChangeEvent } from 'react';
import styled from 'styled-components';
import { Question } from '../model/Forms';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setQuestionTitle } from '../store/slices/formSlice';
import TextArea from '../ui/TextArea';
import TextInput from '../ui/TextInput';

interface QuestionProps {
  question: Question;
  index: number;
}

function QuestionItem({ question, index }: QuestionProps) {
  const form = useAppSelector((state) => state.form.form);

  const dispatch = useAppDispatch();

  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuestionTitle({ newTitle: e.target.value, index: index }));
  };
  const changeTextArea = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuestionTitle({ newTitle: e.target.value, index: index }));
  };

  const MarkupSwitchByType = () => {
    let markup = null;
    switch (question.questionType) {
      case 'text':
        markup = (
          <TextArea
            onChange={(e) => changeTextArea(e)}
            placeholder="이곳에 설문 대상자가 입력하게 됩니다."
            fill
          />
        );
        break;

      default:
        break;
    }
    return markup;
  };

  return (
    <QuestionCard>
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
            onChange={(e) => {}}
            fill
            placeholder="질문 부제목을 입력해주세요 (선택)"
          />
        </QuestionTitle>
        <select value={question.questionType}>
          <option value="text">텍스트</option>
          <option value="radio">객관식 질문</option>
          <option value="checkbox">체크박스</option>
        </select>
      </QuestionTitleDevider>
      {MarkupSwitchByType()}
    </QuestionCard>
  );
}

export default QuestionItem;

const QuestionCard = styled.li`
  padding: 16px;
  background: white;
  border-radius: 16px;
`;

const QuestionTitleDevider = styled.div`
  display: flex;
`;

const QuestionTitle = styled.div`
  flex: 1;
`;
