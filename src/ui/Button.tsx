import React, { ReactChild, ReactChildren } from 'react';
import styled from 'styled-components';

interface ButtonProps {
  variant?: 'outlined';
  color?: 'primary' | 'secondary' | 'default';
  size?: 'large' | 'medium' | 'small' | 'default';
  fill?: boolean;
  onClick?: (e?: any) => {} | void;
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
  background: ${({ color, variant, theme }) => {
    if (variant === 'outlined') {
      return 0;
    } else {
      if (color === 'primary') return theme.colors.primary;
      if (color === 'secondary') return theme.colors.secondary;
      if (color === 'default') return theme.colors.default;
    }
  }};
  color: ${({ color, variant, theme }) => {
    if (variant === 'outlined') {
      if (color === 'primary') return theme.colors.primary;
      if (color === 'secondary') return theme.colors.secondary;
      if (color === 'default') return theme.colors.default;
    } else {
      if (color === 'primary') return 'white';
      if (color === 'default') return 'white';
    }
  }};
  box-shadow: ${({ color, variant, theme }) => {
    if (variant === 'outlined') {
      if (color === 'primary')
        return '0 0 0 2px ' + theme.colors.primary + ' inset';
      if (color === 'secondary')
        return '0 0 0 2px ' + theme.colors.secondary + ' inset';
      if (color === 'default')
        return '0 0 0 2px ' + theme.colors.default + ' inset';
    }
  }};
  border: 0;

  &:hover {
    box-shadow: ${({ color, variant, theme }) => {
      if (variant === 'outlined') {
        if (color === 'primary')
          return '0 0 0 2px ' + theme.colors.primary + ' inset';
        if (color === 'secondary')
          return '0 0 0 2px ' + theme.colors.secondary + ' inset';
        if (color === 'default')
          return '0 0 0 2px ' + theme.colors.default + ' inset';
      } else {
        return '0 0 11px rgba(33, 33, 33, 0.2)';
      }
    }};
    opacity: 0.9;
  }

  background: ${({ isCompleted }) => {
    if (isCompleted)
      return 'linear-gradient(-45deg, #c1bbff, #ffd3f1, #ffecda, #fff9e2)';
  }};
  color: ${({ isCompleted }) => {
    if (isCompleted) return '#390094bd';
  }};
  background-size: 400% 400%;
  animation: gradient 4s ease infinite;
  ${`@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }`}
`;
