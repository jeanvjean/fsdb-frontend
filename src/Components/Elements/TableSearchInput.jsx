import React from 'react';
import styled from '@emotion/styled';
import { Button } from './Button';

const Input = styled.input`
  background: transparent;
  padding: 13px;
  border: none;
  height: 100%;
  outline: none;
  font-size: ${(p) => p.theme.fontSizes.smaller};
  width: 100%;
  flex: 1;
  font-size: 12px;

  &::placeholder {
    opacity: 0.5;
  }
`;

const SearchInputWrapper = styled.label`
  border: 1px solid ${(p) => p.theme.colors.borderColor};
  ${({ error, theme }) => (error ? `border-color: ${theme.colors.red};` : '')};
  width: ${({ width }) => width};
  background-color: ${(p) => p.theme.colors.white};
  display: flex;
  justify-content: space-between;
`;

const SearchButton = styled(Button)`
  background-color: ${(p) => p.theme.colors.mediumBue};
  font-size: ${(p) => p.theme.fontSizes.small};
  color: ${(p) => p.theme.colors.white};
  padding: 0 10px !important;
  min-width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 0;
  font-weight: 600;
  margin: 5px;
  &:hover {
    box-shadow: 0 0 0;
  }
`;
const CloseButton = styled.button`
  background-color: transparent;
  color: ${(p) => p.theme.colors.primaryBlack};
  border: none;
  &:focus {
    outline: none;
  }
`;

const TableSearchInput = (props) => {
  const {
    name,
    defaultValue,
    value,
    placeholder,
    onChange,
    error,
    noRadius,
    width,
    onFocus,
    is_loading,
    handleSearch,
    cancelSearch,
  } = props;
  return (
    <SearchInputWrapper width={width} noRadius={noRadius}>
      <Input
        type="text"
        name={name}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={onChange}
        error={error}
        onFocus={onFocus}
        {...props}
      />
      <CloseButton onClick={cancelSearch}>&times;</CloseButton>
      <SearchButton onClick={handleSearch}>Search</SearchButton>
    </SearchInputWrapper>
  );
};

export default TableSearchInput;
