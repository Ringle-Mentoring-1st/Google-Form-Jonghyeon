import { ChangeEvent, Fragment } from 'react';
import { Option, Question, QuestionType } from '../model/Forms';
import Button from '../ui/Button';
import TextArea from '../ui/TextArea';
import ChoiceInput from './ChoiceInput';
import * as Icon from 'heroicons-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  addOption,
  removeOption,
  setOptionText,
} from '../store/slices/formSlice';
import { _uuid } from '../utils/uuid';
import { setOptionAnswer, setTextAnswer } from '../store/slices/responseSlice';

interface MarkupSwitchByTypeProps {
  question: Question;
  index: number;
  [restProps: string]: any;
}

function MarkupSwitchByType({
  question,
  index,
  ...props
}: MarkupSwitchByTypeProps) {
  let markup = null;

  const response = useAppSelector((state) => state.response);

  const isCompleted = useAppSelector((state) => state.form.form.isCompleted);

  const dispatch = useAppDispatch();

  const choiceTextInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    optionIndex: number
  ) => {
    const newText = e.target.value as string;
    dispatch(setOptionText({ newText, index, optionIndex }));
  };

  const addOptionClickHandler = () => {
    const newOption = { text: '', uuid: _uuid() } as Option;
    dispatch(addOption({ indexQuestion: index, newOption }));
  };

  const removeOptionClickHandler = (
    optionIndex: number,
    optionUuid: string
  ) => {
    dispatch(removeOption({ indexQuestion: index, optionIndex, optionUuid }));
  };

  const textAnswerHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(
      setTextAnswer({
        questionUuid: question.uuid,
        text: e.target.value,
      })
    );
  };

  const choiceAnswerHandler = (optionUuid: string) => {
    dispatch(
      setOptionAnswer({
        questionUuid: question.uuid,
        optionUuid,
        questionType: question.questionType,
      })
    );
  };

  switch (question.questionType) {
    case 'text':
      const indexTextQuestion = response.questions.findIndex(
        (res) => res.uuid === question.uuid
      );
      markup = (
        <TextArea
          value={response.questions[indexTextQuestion]?.textAnswer}
          style={{ marginTop: 12 }}
          onChange={(e) => textAnswerHandler(e)}
          placeholder="이곳에 입력해주세요"
          fill
        />
      );
      break;
    case 'radio':
      const radioOptions = question.options as Option[];
      const indexRadioQuestion = response.questions.findIndex(
        (res) => res.uuid === question.uuid
      );
      markup = radioOptions.map((option, indexOption) => (
        <ChoiceInput
          key={indexOption}
          isSelected={
            response.questions[indexRadioQuestion]?.answer[0] === option.uuid
          }
          value={option.text}
          choiceType={question.questionType}
          placeholder="선택지를 입력해주세요"
          onChangeCheck={() => choiceAnswerHandler(option.uuid)}
          onChangeTextInput={(e) => choiceTextInputChange(e, indexOption)}
          onClickRemoveOptionButton={() =>
            removeOptionClickHandler(indexOption, option.uuid)
          }
        />
      ));
      break;
    case 'checkbox':
      const checkboxOptions = question.options as Option[];
      const indexCheckboxQuestion = response.questions.findIndex(
        (res) => res.uuid === question.uuid
      );
      markup = checkboxOptions.map((option, indexOption) => (
        <ChoiceInput
          key={indexOption}
          isSelected={response.questions[
            indexCheckboxQuestion
          ]?.answer.includes(option.uuid)}
          value={option.text}
          choiceType={question.questionType}
          placeholder="선택지를 입력해주세요"
          onChangeCheck={() => choiceAnswerHandler(option.uuid)}
          onChangeTextInput={(e) => choiceTextInputChange(e, indexOption)}
          onClickRemoveOptionButton={() =>
            removeOptionClickHandler(indexOption, option.uuid)
          }
        />
      ));
      break;
    default:
      break;
  }

  return (
    <Fragment>
      <div {...props}>{markup}</div>

      {(question.questionType === 'radio' ||
        question.questionType === 'checkbox') &&
        !isCompleted && (
          <Button
            size="small"
            onClick={addOptionClickHandler}
            style={{ marginTop: 6 }}
          >
            <Icon.PlusCircle size={18} />
          </Button>
        )}
    </Fragment>
  );
}

export default MarkupSwitchByType;
