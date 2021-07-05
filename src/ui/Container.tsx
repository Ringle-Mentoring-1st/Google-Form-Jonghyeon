import React, { ReactNode, ReactChild, ReactChildren } from 'react';
import styled from 'styled-components';

interface ContainerProps {
  children: ReactNode | ReactChild | ReactChildren;
}

function Container({ children }: ContainerProps) {
  return <StyledContainer className="container">{children}</StyledContainer>;
}

export default Container;

const StyledContainer = styled.div<ContainerProps>`
  max-width: 800px;
  margin: auto;
`;
