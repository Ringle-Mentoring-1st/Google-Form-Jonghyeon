import React, { useState } from 'react';
import styled from 'styled-components';

interface TextInputProps {
  type?: 'text' | 'password' | 'checkbox';
  value?: string;
  placeholder?: string;
  fill?: boolean;
  [props: string]: any;
  onChange?(e: any): any;
}

function TextInput({
  type,
  value,
  placeholder,
  fill = false,
  onChange,
  ...props
}: TextInputProps) {
  const [focus, setFocus] = useState(false);

  return (
    <StyledTextInputContainer fill={fill} {...props}>
      <StyledTextInput
        onFocus={() => {
          setFocus(true);
        }}
        onBlur={() => {
          setFocus(false);
        }}
        onChange={onChange}
        type={type}
        value={value}
        placeholder={placeholder}
        onKeyUp={(e: any) => {
          if (e.keyCode == 27) e.target.blur();
        }}
      />
      <StyledTextInputUnderBar focus={focus} />
    </StyledTextInputContainer>
  );
}

export default TextInput;

const StyledTextInputContainer = styled.div<TextInputProps>`
  position: relative;
  display: ${({ fill }) => (fill ? 'flex' : 'inline-block')};
  flex: ${({ fill }) => (fill ? 1 : '')};
  flex-direction: column;
  border-radius: 16px;
  background-color: rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const StyledTextInput = styled.input<TextInputProps>`
  font-weight: 700;
  padding: 16px 24px;
  background: none;
  border: 0;
  outline: 0;
  font-size: 16px;
  min-width: 200px;
`;

const StyledTextInputUnderBar = styled.div<{ focus: boolean }>`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 2px;
  background: rgba(98, 0, 255, 0.3);
  width: ${({ focus }) => (focus ? '100%' : '0%')};
  transition: 0.1s all linear;
  margin: auto;
  border-radius: 2px;
`;
