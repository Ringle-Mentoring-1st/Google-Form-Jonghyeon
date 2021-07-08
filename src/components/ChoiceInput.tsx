import styled from 'styled-components';
import Button from '../ui/Button';
import TextInput from '../ui/TextInput';
import * as Icon from 'heroicons-react';

interface ChoiceInputProps {
  isSelected?: boolean;
  id?: any;
  value: string;
  choiceType: string;
  placeholder?: string;
  onChangeTextInput?(e: any): any;
  onClickRemoveOptionButton: any;
}

function ChoiceInput({
  isSelected = false,
  id,
  value,
  choiceType,
  placeholder,
  onChangeTextInput,
  onClickRemoveOptionButton,
}: ChoiceInputProps) {
  return (
    <ChoiceInputContainer>
      <Button size="small" onClick={onClickRemoveOptionButton}>
        <Icon.MinusCircle size={18} />
      </Button>
      <input id={id} type={choiceType} checked={isSelected} />
      <TextInput
        value={value}
        placeholder={placeholder}
        fill
        onChange={onChangeTextInput}
        style={{ marginTop: 6 }}
      />
    </ChoiceInputContainer>
  );
}

export default ChoiceInput;

const ChoiceInputContainer = styled.div`
  display: flex;
  align-items: center;
`;
