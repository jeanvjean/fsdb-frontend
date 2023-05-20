import React from 'react';
import styled from '@emotion/styled';
import { EmptyStateIcon } from '../Elements';

const Empty = styled.div`
  display: flex;
  justify-content: center;
  flex-flow: column nowrap;
  align-items: center;
  height: 100%;
  width: 100%;
  color: rgb(170, 170, 170);
`;
Empty.Text = styled.p`
  font-size: ${(p) => p.theme.fontSizes.small};
  text-align: center;
  margin-top: 1rem;
  width: 200px;
`;

const EmptyState = ({ text, size, iconSize, style, ...props }) => {
  return (
    <Empty {...props} style={{ height: size, width: '100%', ...style }}>
      <EmptyStateIcon height={iconSize} />
      <Empty.Text>{text}</Empty.Text>
    </Empty>
  );
};

export default EmptyState;
