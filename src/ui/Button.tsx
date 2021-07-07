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
  border-radius: 16px;
  transition: box-shadow 0.2s, opacity 0.2s;
  cursor: pointer;
  background: ${({ color, variant }) => {
    if (variant === 'outlined') return 0;
    if (color === 'primary') return '#5f5cee';
    if (color === 'secondary') return '#ebddaa';
    if (color === 'default') return '#7c7c7c';
  }};
  color: ${({ color, variant }) => {
    if (variant === 'outlined') {
      if (color === 'primary') return '#5f5cee';
      if (color === 'secondary') return '#ebddaa';
      if (color === 'default') return '#7c7c7c';
    }
    if (color === 'primary') return 'white';
    if (color === 'default') return 'white';
  }};
  box-shadow: ${({ color, variant }) => {
    if (variant === 'outlined') {
      if (color === 'primary') return '0 0 0 2px #5f5cee inset';
      if (color === 'secondary') return '0 0 0 2px #ebddaa inset';
      if (color === 'default') return '0 0 0 2px #7c7c7c inset';
    }
  }};
  border: 0;

  &:hover {
    box-shadow: ${({ color, variant }) => {
      if (variant === 'outlined') {
        if (color === 'primary') return '0 0 0 2px #5f5cee inset';
        if (color === 'secondary') return '0 0 0 2px #ebddaa inset';
        if (color === 'default') return '0 0 0 2px #7c7c7c inset';
      } else {
        return '0 0 11px rgba(33, 33, 33, 0.2)';
      }
    }};
    opacity: 0.9;
  }
`;
