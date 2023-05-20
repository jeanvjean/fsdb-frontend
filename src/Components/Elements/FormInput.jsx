import React from 'react';
import styled from '@emotion/styled';
import { Label } from './Label';

export const Input = styled.input`
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  ${({ error, theme }) => (error ? `border-color: ${theme.colors.red};` : '')}
  background: ${({ theme }) => theme.colors.white};
  padding: 7px;
  margin: 5px 0;
  -webkit-transition: all 0.30s ease-in-out;
  -moz-transition: all 0.30s ease-in-out;
  -ms-transition: all 0.30s ease-in-out;
  -o-transition: all 0.30s ease-in-out;
  transition: all 0.30s ease-in-out;
  outline: none;
  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.red4};
  }
  &:disabled {
    background-color: #F2F5FD;
    cursor: no-drop;
  }
`;

export const FormInput = (props) => {
  const {
    label,
    name,
    id,
    defaultValue,
    value,
    placeholder,
    type,
    onChange,
    error,
    whiteBg,
    labelStyle,
    onFocus,
    width,
    flex,
  } = props;

  return (
    <Label
      htmlFor={id}
      flex={flex}
      width={width}
      labelStyle={labelStyle}
      error={error}
    >
      {label}
      <Input
        type={type}
        name={name}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={onChange}
        error={error}
        whiteBg={whiteBg}
        onFocus={onFocus}
        {...props}
      />
    </Label>
  );
};

