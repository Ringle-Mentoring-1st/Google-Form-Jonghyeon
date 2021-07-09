import styled from 'styled-components';
import Button from '../ui/Button';
import TextInput from '../ui/TextInput';
import * as Icon from 'heroicons-react';
import { useAppSelector } from '../store/hooks';

interface ChoiceInputProps {
  isSelected?: boolean;
  id?: any;
  value: string;
  choiceType: 'radio' | 'checkbox' | 'text';
  placeholder?: string;
  onChangeCheck?: () => {} | void;
  onChangeTextInput?(e: any): any;
  onClickRemoveOptionButton: any;
}

function ChoiceInput({
  isSelected = false,
  id,
  value,
  choiceType,
  placeholder,
  onChangeCheck,
  onChangeTextInput,
  onClickRemoveOptionButton,
}: ChoiceInputProps) {
  const isCompleted = useAppSelector((state) => state.form.form.isCompleted);

  return (
    <ChoiceInputContainer>
      <input
        id={id}
        type={choiceType}
        checked={isSelected}
        onChange={onChangeCheck}
      />
      {!isCompleted ? (
        <TextInput
          value={value}
          placeholder={placeholder}
          fill
          onChange={onChangeTextInput}
        />
      ) : (
        <text>{value}</text>
      )}
      {!isCompleted && (
        <Button
          size="small"
          onClick={onClickRemoveOptionButton}
          style={{ marginLeft: 6 }}
        >
          <Icon.MinusCircle size={18} />
        </Button>
      )}
    </ChoiceInputContainer>
  );
}

export default ChoiceInput;

const ChoiceInputContainer = styled.div`
  margin-top: 6px;
  display: flex;
  align-items: center;
`;
