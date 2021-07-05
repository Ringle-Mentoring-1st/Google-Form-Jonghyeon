import React, { ReactChild, ReactChildren } from 'react';
import styled from 'styled-components';

interface ButtonProps {
  variant?: 'outlined';
  color?: 'primary' | 'secondary' | 'default';
  size?: 'large' | 'medium' | 'small' | 'default';
  fill?: boolean;
  onClick?: () => {} | void;
  children: ReactChild | ReactChildren;
  [x: string]: any;
}

export default function Button({
  variant,
  color,
  size = 'medium',
  fill = false,
  children,
  onClick,
  ...props
}: ButtonProps) {
  return (
    <StyledButton
      onClick={onClick}
      variant={variant}
      color={color}
      size={size}
      fill={fill}
      {...props}
    >
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.button<ButtonProps>`
  font-weight: 700;
  font-size: ${({ size }) => {
    if (size === 'large') return '20px';
    if (size === 'medium') return '16px';
    if (size === 'small') return '12px';
  }};
  padding: ${({ size }) => {
    if (size === 'large') return '20px 26px';
    if (size === 'medium') return '16px 26px';
    if (size === 'small') return '12px 20px';
  }};
  width: ${({ fill }) => (fill ? '100%' : undefined)};
  border: 0;
  border-radius: 16px;
  transition: box-shadow 0.2s, opacity 0.2s;
  cursor: pointer;

  &.outlined {
    border: 1px solid white;

    &.primary {
      color: #5f5cee;
      background: 0;
      border: 1px solid #5f5cee;
    }
    &.secondary {
      color: #ebddaa;
      background: 0;
      border: 1px solid #ebddaa;
    }
    &.default {
      color: white;
      background: 0;
      border: 1px solid white;
    }
  }

  &:hover {
    box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
    opacity: 0.9;
  }
`;
