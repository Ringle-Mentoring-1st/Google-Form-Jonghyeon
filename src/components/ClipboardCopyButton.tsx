import React, { MouseEvent, ReactChild, ReactChildren } from 'react';
import Button from '../ui/Button';
import { CopyToClipboard } from 'react-copy-to-clipboard';

interface ClipboardCopyButtonProps {
  color?: 'primary' | 'secondary' | 'default';
  size?: 'small';
  fill?: boolean;
  isCompleted: boolean;
  children: ReactChild | ReactChildren;
  copyText: string;
  [restProps: string]: any;
}

function ClipboardCopyButton({
  color,
  size,
  fill,
  copyText,
  isCompleted,
  children,
  ...props
}: ClipboardCopyButtonProps) {
  const clickButtonStopPropagation = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
  };

  return (
    <CopyToClipboard
      text={copyText}
      onCopy={() => {
        alert('링크를 복사했습니다🥳 공유하세요!');
      }}
    >
      <Button
        color={color}
        size={size}
        fill={fill}
        onClick={clickButtonStopPropagation}
        isCompleted={isCompleted}
        {...props}
      >
        {children}
      </Button>
    </CopyToClipboard>
  );
}

export default ClipboardCopyButton;
