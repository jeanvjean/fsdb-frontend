import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled from '@emotion/styled';
import { IconEye, IconEyeHide, Text } from '../Elements';

const VisibilityOnIcon = styled(IconEye)`
  width: 24px;
  margin: auto;
`;
const VisibilityOffIcon = styled(IconEyeHide)`
  width: 24px;
  margin: auto;
`;

const PasswordInputContainer = styled.div`
  display: flex;
  width: 380px;
  border: 1px solid ${({ theme, error }) => (!error ? theme.colors.lightBlack2 : theme.colors.red)};
  @media (max-width: ${({ theme }) => theme.breaks.SM}) {
    width: 300px;
  }
`;

const Input = styled.input`
  border: none;
  width: 380px;
  height: ${({page}) => page ==='login' ? "60px" : "40px"};
  padding: 7px;
  background: transparent;
  font-size: ${({ theme }) => theme.fontSizes.normal};
  @media (max-width: ${({ theme }) => theme.breaks.SM}) {
    width: 300px;
  }
  &:focus {
    outline: none;
  }
`;

const IconButton = styled.i`
  border: none;
  background-color: transparent;
  height: 100%;
  margin: auto 18px;
  display: flex;
  align-items: center;

  &:focus {
    outline: none;
  }
`;

const InputWrapper = styled.label`
  display: flex;
  flex-flow: column nowrap;
  padding-top: 10px;
`;

const PasswordInput = (props) => {
  const { placeholder, onChange, name, error, label, ...others } = props;
  const [visibility, setVisibility] = useState(false);
  const visibilityRef = useRef(null);

  const toggleVisibility = useCallback(
    (e) => {
      e.preventDefault();
      if (visibilityRef?.current?.contains(e.target)) {
        setVisibility(!visibility);
      }
    },
    [visibility]
  );

  useEffect(() => {
    document.addEventListener('click', toggleVisibility);
    return () => {
      document.removeEventListener('click', toggleVisibility);
    };
  }, [toggleVisibility]);

  return (
    <InputWrapper>
      <span>{label}</span>
      <PasswordInputContainer error={error}>
        <Input
          type={visibility ? 'text' : 'password'}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          page={props.page}
          {...others}
        />
        <IconButton ref={visibilityRef}>
          {visibility ? <VisibilityOnIcon /> : <VisibilityOffIcon />}
        </IconButton>
      </PasswordInputContainer>
      <Text color="red" size="small">
        {error}
      </Text>
    </InputWrapper>
  );
};

export default PasswordInput;
