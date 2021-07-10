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
      {isCompleted && (
        <Styled onClick={onChangeCheck} type={choiceType} checked={isSelected}>
          <div className="choice-container" id={id}>
            <div className="choice">
              {choiceType === 'checkbox' && (
                <Icon.Check
                  className="check"
                  style={{ color: 'white' }}
                ></Icon.Check>
              )}{' '}
            </div>
          </div>

          <label htmlFor={id}>{value}</label>
        </Styled>
      )}

      {!isCompleted && (
        <>
          <Styled type={choiceType} checked={false}>
            <div className="choice-container" id={id}>
              <div className="choice">
                {choiceType === 'checkbox' && (
                  <Icon.Check
                    className="check"
                    style={{ color: 'white' }}
                  ></Icon.Check>
                )}{' '}
              </div>
            </div>
            <TextInput
              value={value}
              placeholder={placeholder}
              fill
              onChange={onChangeTextInput}
            />
          </Styled>
        </>
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
  margin-top: 12px;
  position: relative;
`;

const Styled = styled.div<{ type: string; checked: boolean }>`
  flex: 1;
  font-weight: 700;
  background: ${({ theme }) => theme.colors.gray100};
  display: flex;
  align-items: center;
  padding: 12px;
  border-radius: 16px;
  &:hover {
    background: ${({ theme }) => theme.colors.gray200};
  }
  transition: all 0.2s ease-in-out;

  > .choice-container {
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
    background: ${({ theme }) => theme.colors.white};
    border-radius: ${({ type }) => (type === 'checkbox' ? '6px' : '999px')};
    overflow: hidden;
    box-shadow: 0px 0px 0px 0px ${({ theme }) => theme.colors.gray300},
      inset 0px 0px 0px
        ${({ checked, theme, type }) =>
          type === 'checkbox'
            ? (checked ? '32px' : '0px') +
              (checked ? theme.colors.primary : theme.colors.gray300)
            : 0 + (checked ? theme.colors.white : theme.colors.gray300)};
    border: 3px solid
      ${({ theme, checked }) =>
        checked ? theme.colors.primary : theme.colors.gray300};
    transition: all 0.2s ease-in-out;
    margin-right: 6px;

    &:hover {
      box-shadow: 0px 0px 0px 0px
          ${({ theme, checked }) =>
            checked ? theme.colors.white : theme.colors.gray300},
        inset 0px 0px 0px 32px
          ${({ theme, checked }) =>
            checked ? theme.colors.white : theme.colors.gray300};
      transition: all 0.04s ease-in-out;
    }

    > .choice {
      display: flex;
      justify-content: center;
      align-items: center;
      width: ${({ checked, type }) => {
        if (type === 'checkbox') {
          return checked === true ? '90px' : '0px';
        } else if (type === 'radio') {
          return checked === true ? '14px' : '0px';
        }
      }};
      height: ${({ checked, type }) => {
        if (type === 'checkbox') {
          return checked === true ? '90px' : '0px';
        } else if (type === 'radio') {
          return checked === true ? '14px' : '0px';
        }
      }};
      border-radius: ${({ type }) => {
        if (type === 'checkbox') {
          return '6px';
        } else if (type === 'radio') {
          return '999px';
        }
      }};
      background: ${({ theme }) => theme.colors.primary};
      transition: all 0.2s ease-in-out;
    }
  }
`;
