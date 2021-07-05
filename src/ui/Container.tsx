import React, { ReactNode, ReactChild, ReactChildren } from 'react';

interface ContainerProps {
  children: ReactNode | ReactChild | ReactChildren;
}

function Container({ children }: ContainerProps) {
  return <div className="container">{children}</div>;
}

export default Container;
