import React from 'react';
import styled from '@emotion/styled';
import { Label } from './Label';
import { Text } from './Text';

export const Select = styled.select`
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  ${({ error, theme }) => (error ? `border-color: ${theme.colors.red};` : '')};
  background: ${({ whiteBg, theme }) => whiteBg ? theme.colors.white : 'transparent'};
  background-color: white;
  padding: 7px;
  margin: 5px 0;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;

  margin: 0;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-appearance: none;
  -moz-appearance: none;

  background-image: linear-gradient(45deg, transparent 50%, gray 50%),
    linear-gradient(135deg, gray 50%, transparent 50%);
  background-position: calc(100% - 20px) calc(1em + 2px), calc(100% - 15px) calc(1em + 2px),
    calc(100% - 2.5em) 0.5em;
  background-size: 5px 5px, 5px 5px, 1px 1.5em;
  background-repeat: no-repeat;
  &:focus {
    /* border: 1px solid ${({ theme }) => theme.colors.green2}; */
    outline: none;
  }
  &:disabled {
    background-color: #f2f5fd;
    cursor: no-drop;
  }
`;

const SelectField = (props) => {
  const {
    label,
    name,
    id,
    defaultValue,
    value,
    onChange,
    error,
    noRadius,
    whiteBg,
    onFocus,
    children,
    flex,
  } = props;

  return (
    <Label style={{ flex }} htmlFor={id} error={error}>
      <span style={{ marginBottom: '5px' }}>{label}</span>
      <Select
        name={name}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        error={error}
        noRadius={noRadius}
        whiteBg={whiteBg}
        onFocus={onFocus}
        {...props}
      >
        {children}
      </Select>
      <Text color="red" size="small">
        {error}
      </Text>
    </Label>
  );
};

export default SelectField;
