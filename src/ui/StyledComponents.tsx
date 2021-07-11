import styled from 'styled-components';

export const Paper = styled.div`
  padding: 16px;
  background: #f3f3f3;
  border-radius: 24px;
  box-shadow: 0px 12px 32px -12px rgba(0, 0, 0, 0.1);
`;

export const QuestionCard = styled.li`
  padding-left: 8px;
  background: #fafafa;
  border-radius: 16px;
  margin-bottom: 16px;
  box-shadow: 0px 12px 32px -12px rgba(0, 0, 0, 0.1), inset 0;
  overflow: hidden;
  transition: all 0.2s ease;
  &:hover {
    background: white;
  }
  &:focus-within {
    box-shadow: 0px 12px 32px -12px rgba(0, 0, 0, 0.1),
      inset 44px 0 0 -36px ${({ theme }) => theme.colors.primary};
  }
`;

export const QuestionContent = styled.div`
  padding: 8px 16px 16px 16px;
`;

export const QuestionIndex = styled.h3`
  flex: 1;
  text-align: left;
  padding-left: 8px;
`;

export const TopWindow = styled.div`
  display: flex;
  flex-direction: row-reverse;
  padding: 16px 16px 0 16px;
`;

export const QuestionTitleDevider = styled.div`
  display: flex;
  align-items: flex-start;
`;

export const QuestionTitle = styled.div`
  flex: 1;
  text-align: left;
`;

export const TypeSelectContainer = styled.div`
  position: relative;
  background: ${({ theme }) => theme.colors.gray200};
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.gray300};
  }
`;

export const TypeSelect = styled.select`
  background: none;
  border: 0;
  padding: 12px 48px 12px 16px;
  font-size: 16px;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.black};
  outline: none;
  appearance: none;
`;

export const TypeOption = styled.option`
  appearance: none;
`;

export const TypeSelectArrowCustom = styled.div`
  position: absolute;
  display: block;
  background: ${({ theme }) => theme.colors.gray300};
  width: 36px;
  right: 0;
  top: 0;
  bottom: 0;
  pointer-events: none;

  &::before,
  &::after {
    --size: 8px;
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    transform: translate(-55%, -50%);
  }

  &::before {
    border-left: var(--size) solid transparent;
    border-right: var(--size) solid transparent;
    border-bottom: var(--size) solid ${({ theme }) => theme.colors.gray400};
    top: 37%;
  }

  &::after {
    border-left: var(--size) solid transparent;
    border-right: var(--size) solid transparent;
    border-top: var(--size) solid ${({ theme }) => theme.colors.gray400};
    top: 63%;
  }
`;

export default {
  Paper,
  QuestionCard,
  QuestionContent,
  QuestionIndex,
  TopWindow,
  QuestionTitleDevider,
  QuestionTitle,
  TypeSelect,
};
