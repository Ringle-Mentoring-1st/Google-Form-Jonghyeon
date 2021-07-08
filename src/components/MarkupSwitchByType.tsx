import { ChangeEvent, Fragment, useState } from 'react';
import { Option, Question } from '../model/Forms';
import Button from '../ui/Button';
import TextArea from '../ui/TextArea';
import ChoiceInput from './ChoiceInput';
import * as Icon from 'heroicons-react';
import { useAppDispatch } from '../store/hooks';
import {
  addOption,
  removeOption,
  setOptionText,
  setQuestionTitle,
} from '../store/slices/formSlice';

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
  const [indexSelectedRadio, setIndexSelectedRadio] = useState(1);

  const dispatch = useAppDispatch();

  const changeTextArea = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuestionTitle({ newTitle: e.target.value, index: index }));
  };

  const choiceTextInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    optionIndex: number
  ) => {
    const newText = e.target.value as string;
    dispatch(setOptionText({ newText, index, optionIndex }));
  };

  const addOptionClickHandler = () => {
    dispatch(addOption(index));
  };

  const removeOptionClickHandler = (optionIndex: number) => {
    dispatch(removeOption({ questionIndex: index, optionIndex }));
  };

  switch (question.questionType) {
    case 'text':
      markup = (
        <div {...props}>
          <TextArea
            style={{ marginTop: 12 }}
            onChange={(e) => changeTextArea(e)}
            placeholder="이곳에 설문 대상자가 답변을 입력하게 됩니다."
            fill
          />
        </div>
      );
      break;

    case 'radio':
      const radioOptions = question.options as Option[];
      markup = (
        <div {...props}>
          {radioOptions.map((option, index) => (
            <ChoiceInput
              isSelected={index === indexSelectedRadio}
              value={option.text}
              choiceType={question.questionType}
              placeholder="선택지를 입력해주세요"
              onChangeTextInput={(e) => choiceTextInputChange(e, index)}
              onClickRemoveOptionButton={() => removeOptionClickHandler(index)}
            />
          ))}
        </div>
      );
      break;

    case 'checkbox':
      const checkboxOptions = question.options as Option[];
      markup = (
        <div {...props}>
          {checkboxOptions.map((option, index) => (
            <ChoiceInput
              isSelected={true}
              value={option.text}
              choiceType={question.questionType}
              placeholder="선택지를 입력해주세요"
              onChangeTextInput={(e) => choiceTextInputChange(e, index)}
              onClickRemoveOptionButton={() => removeOptionClickHandler(index)}
            />
          ))}
        </div>
      );
      break;

    default:
      break;
  }

  return (
    <Fragment>
      {markup}
      {(question.questionType === 'radio' ||
        question.questionType === 'checkbox') && (
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
