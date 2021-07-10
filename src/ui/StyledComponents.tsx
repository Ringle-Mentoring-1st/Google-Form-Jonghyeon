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
`;

export const QuestionTitle = styled.div`
  flex: 1;
  text-align: left;
`;

export const TypeSelect = styled.select`
  appearance: none;
  background-color: white;
  border: 2px solid lightgray;
  border-radius: 16px;
  margin: 0;
  font-family: inherit;
  font-size: inherit;
  cursor: inherit;
  line-height: inherit;
  outline: none;
  height: 40px;
`;
export const TypeOption = styled.option`
  appearance: none;
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
