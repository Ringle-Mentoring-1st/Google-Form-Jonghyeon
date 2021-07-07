import React, { useState } from 'react';
import styled from 'styled-components';

interface TextAreaProps {
  type?: 'text' | 'password' | 'checkbox';
  value?: string;

  placeholder?: string;
  fill?: boolean;
  [props: string]: any;
  onChange(e: any): any;
}

function TextArea({
  type,
  value,
  placeholder,
  fill = false,
  ...props
}: TextAreaProps) {
  const [focus, setFocus] = useState(false);

  return (
    <StyledTextAreaContainer fill={fill} {...props}>
      <StyledTextArea
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
        onKeyUp={(e: any) => {
          if (e.keyCode == 27) e.target.blur();
        }}
      />
      <StyledTextAreaUnderBar focus={focus} />
    </StyledTextAreaContainer>
  );
}

export default TextArea;

const StyledTextAreaContainer = styled.div<TextAreaProps>`
  position: relative;
  display: ${({ fill }) => (fill ? 'flex' : 'inline-block')};
  flex-direction: column;
  border-radius: 16px;
  background-color: rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const StyledTextArea = styled.textarea<TextAreaProps>`
  font-weight: 700;
  padding: 16px 24px;
  background: none;
  border: 0;
  outline: 0;
  font-size: 16px;
  min-width: 200px;
`;

const StyledTextAreaUnderBar = styled.div<{ focus: boolean }>`
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
