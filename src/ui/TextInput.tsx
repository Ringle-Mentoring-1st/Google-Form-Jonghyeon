import React, { useState } from 'react';
import styled from 'styled-components';

interface TextInputProps {
  type?: 'text' | 'password' | 'checkbox';
  value?: string;

  placeholder?: string;
  fill?: boolean;
  [props: string]: any;
  onChange(e: any): any;
}

function TextInput({
  type,
  value,
  placeholder,
  fill = false,
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
        type={type}
        value={value}
        placeholder={placeholder}
        fill
      />
      <StyledTextInputUnderBar focus={focus} />
    </StyledTextInputContainer>
  );
}

export default TextInput;

const StyledTextInputContainer = styled.div<TextInputProps>`
  position: relative;
  display: ${({ fill }) => (fill ? 'flex' : 'inline-block')};
  flex-direction: column;
  border-radius: 16px;
  background-color: rgba(255, 255, 255, 0.1);
  overflow: hidden;
`;

const StyledTextInput = styled.input<TextInputProps>`
  color: white;
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
  background: rgba(255, 255, 255, 0.3);
  width: ${({ focus }) => (focus ? '100%' : '0%')};
  transition: 0.1s all linear;
  margin: auto;
  border-radius: 2px;
`;
