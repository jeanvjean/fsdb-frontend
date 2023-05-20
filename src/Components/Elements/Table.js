import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Button } from './Button';
import { Checkbox } from './CheckBox';

const Wrapper = styled.div`
  display: grid;
  flex-direction: column;
  grid-template-columns: 1fr;
  overflow-x: auto;
  width: 100%;
  overflow-y: visible;
`;

export const TableWrapper = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.small};
  min-height: 100px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: stretch;
  width: 100%;
  padding: 0 2rem;

  @media (max-width: ${({ theme }) => theme.breaks.MD}) {
    padding: 0 0.75rem;
  }

  .sticky {
    position: sticky !important;
    left: 0;
    top: 0;
    z-index: 1;
    background-color: white;
  }
`;

export const OverflowIndicator = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
`;
export const Indicator = styled(Button)`
  box-shadow: 0 0 0;
  font-size: ${(p) => p.theme.fontSizes.xSmall};
  font-weight: 600;
  display: flex;
  border: none;
  &:hover {
    box-shadow: 0 0 0;
  }
  &:focus {
    border: none;
    outline: none;
  }
`;
export const OverflowArrow = styled.div`
  animation: scrollIndicator 1.2s ease-in infinite;
  width: 2rem;
  @keyframes scrollIndicator {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(40%);
    }
  }
`;

const TableComponent = styled.table`
  border-collapse: collapse;
  position: relative;
  border-spacing: 0;
  max-width: 130%;
  display: table;
  border-top: 0;
  border: none;
  height: 100%;
  color: ${({ theme }) => theme.colors.dark8};
  border: 1px solid ${({ theme }) => theme.colors.grey5};
  border-top: 0;
`;

const Th = styled.th`
  color: ${({ theme }) => theme.colors.darkGray};
  padding: 0.8rem;
  font-weight: normal;
  position: relative;
  font-weight: bold;
  font-size: ${(p) => p.theme.fontSizes.small};
  text-align: inherit;
  vertical-align: center;
  word-break: nowrap;

  &:hover {
    background-color: transparent;
    cursor: pointer;
  }
  ${({ autoWidth }) =>
    autoWidth &&
    css`
      min-width: auto;
    `}
`;
const Flex = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  white-space: nowrap;
`;

const ViewButton = styled(Button)`
  padding: 6px 18px;
  color: ${(p) => p.theme.colors.white};
  font-size: ${(p) => p.theme.fontSizes.small};
  background-color: ${({ theme }) => theme.colors.mediumBue};
  box-shadow: 0 0 0;
  &:hover {
    box-shadow: 0 0 0;
  }
  ${(p) =>
    p.green &&
    css`
      background-color: ${p.theme.colors.green3};
    `};
`;

const Status = styled.div`
  max-width: 8rem;
  padding: 3px 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0;
  text-transform: capitalize;
  color: #fff;
  font-size: ${(p) => p.theme.fontSizes.small};
  ${(p) =>
    p.approved &&
    css`
      background-color: ${p.theme.colors.green3};
    `};

  ${(p) =>
    p.pending &&
    css`
      background-color: ${p.theme.colors.pending};
    `};
`;

const Tr = styled.tr`
  position: relative;
  &:hover {
    background: ${(p) => p.theme.colors['pale-grey']};
  }

  ${({ empty }) =>
    empty &&
    css`
      &:hover {
        background-color: transparent;
      }
    `}
`;

const Td = styled.td`
  font-size: ${(p) => p.theme.fontSizes.small};
  padding: 0.8rem 1rem;
  margin: 0;
  text-align: inherit;
  word-break: wrap;
`;
const TableHead = styled.thead`
  text-align: left;
  display: table-header-group;
  vertical-align: middle;
  border: none;
  position: relative;
  border-top: none;
  border-bottom: 1px solid ${(p) => p.theme.colors?.borderColor};
  border-top: 1px solid ${(p) => p.theme.colors?.borderColor};
  background-color: ${(p) => p.theme.colors['white-four']};
`;
const TableBody = styled.tbody`
  tr {
    border-bottom: 1px solid ${(p) => p.theme.colors.borderColor};
    &:nth-of-type(even) {
      /* background-color: ${(p) => p.theme.colors['white-four']}; */
    }
  }
`;

const Icons = styled.div`
  display: inline-flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  align-items: center;
  height: 1rem;
  width: 1rem;
  float: right;
  /* margin-top: 3px; */
`;

export const Table = (props) => {
  const { children } = props;

  return (
    <>
      <Wrapper>
        <TableComponent {...props}>{children}</TableComponent>
      </Wrapper>
    </>
  );
};

Table.Body = TableBody;
Table.Head = TableHead;
Table.Th = Th;
Table.Flex = Flex;
Table.Icons = Icons;
Table.Tr = Tr;
Table.Td = Td;
Table.ViewButton = ViewButton;
Table.Status = Status;
Table.Checkbox = Checkbox;
Table.OverflowIndicator = OverflowIndicator;
Table.Indicator = Indicator;
Table.OverflowArrow = OverflowArrow;
