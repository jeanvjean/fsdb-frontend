import React from 'react'
import styled from '@emotion/styled';
import { ReloadIcon } from '../Elements';

export const Reloader = styled.button`
  border: 1px solid #00cfe6;
  background: #ffffff;
  height: 32px;
  min-width: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    opacity: 0.8;
    transform: scale(1.05);
    border-color: #15a5db;
    transition: all 0.2s linear;
    cursor: pointer;
  }
  &:focus {
    outline: none;
  }
`;

const ReloaderBtn = ({handleClick}) => (
  <Reloader onClick={handleClick}>
    <ReloadIcon />
  </Reloader>
)

ReloaderBtn.defaultProps = {
  handleClick: () => false
}

export default ReloaderBtn
