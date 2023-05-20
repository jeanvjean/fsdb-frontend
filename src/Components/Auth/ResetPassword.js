/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { withRouter, useHistory } from 'react-router-dom';

import {
  StyledForm,
  LogoWrapper,
  FormTitle,
  FormActions,
  BackToLoginBtn,
  LoginBtn,
  SuccessMsgContainer,
} from './Styles';
import { Button, Logo, Text, toastMessage } from '../Elements';
import AuthLayout from '../Layouts/AuthLayout';
import { validatePassword, comparePasswords } from './utils';
import PasswordInput from './PasswordInput';
import { getURLParameter } from '../utils';
import { utils } from '../../api/utils';
import { Spinner } from '../Elements/Spinner';

export const ResetBtn = styled(Button)`
  flex-basis: 60%;
  background-color: ${({ theme }) => theme.colors.mediumBue};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  height: 100%;
  font-size: ${({ theme }) => theme.fontSizes.smaller};
  cursor: pointer;
  &:focus {
    outline: 0;
  }
`;

const initialState = {
  token: '',
  values: {
    password: '',
    password_confirmation: '',
  },
  errors: {
    password: '',
    password_confirmation: '',
  },
};

const ResetPassword = (props) => {
  const [state, setState] = useState(initialState);
  const [resetting, setResetting] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  useEffect(() => {
    const token = getURLParameter(history.location, 'token');
    setState((prev) => ({ ...prev, token }));
  }, []);

  const handleChange = (e) => {
    e.persist();
    const { name, value } = e.target;
    console.log(value);
    setState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [name]: value,
      },
    }));
  };

  const validate = () => {
    const values = { ...state.values };
    const errors = { ...state.errors };

    errors.password = validatePassword(values.password);
    errors.password_confirmation = validatePassword(values.password_confirmation);
    errors.password_confirmation = !comparePasswords(values.password, values.password_confirmation)
      ? 'Passwords do not match'
      : '';

    for (let key in errors) {
      if (errors[key]) {
        setState((prev) => ({ ...prev, errors }));
        return false;
      }
    }
    setState((prevState) => {
      return {
        ...prevState,
        errors: initialState.errors,
      };
    });
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
    setState((prev) => ({
      ...prev,
      errors: initialState.errors
    }))
    const isValid = validate();
    const { token, values } = state;
    if (isValid) {
      try {
        setResetting(true);
        await utils.resetPasswd({ token, ...values });
        setResetting(false);
        setSuccess('You have successfully changed your password.');
      } catch (error) {
        setResetting(false);
        setError(error.response?.data?.message);
        toastMessage({ type: 'error', message: error.response?.data?.message });
      }
    }
  };

  const goBackToLogin = (e) => {
    e.preventDefault();
    props.history.push('/login');
  };

  return (
    <AuthLayout>
      <StyledForm>
        <LogoWrapper>
          <Logo />
        </LogoWrapper>

        <FormTitle>
          <h3>Reset password</h3>
        </FormTitle>

        <Text style={{ width: '360px' }} color="red" align="left">
          {error}
        </Text>

        {!Boolean(success) ? (
          <>
            <PasswordInput
              name="password"
              placeholder="Enter new password"
              onChange={handleChange}
              error={state.errors?.password}
            />
            <PasswordInput
              name="password_confirmation"
              placeholder="Confirm password"
              onChange={handleChange}
              error={state.errors?.password_confirmation}
            />
          </>
        ) : (
          <SuccessMsgContainer>{success}</SuccessMsgContainer>
        )}

        {!false ? (
          <FormActions>
            <LoginBtn onClick={handleSubmit}>Submit {resetting && <Spinner size="1rem" />} </LoginBtn>
          </FormActions>
        ) : (
          <FormActions>
            <BackToLoginBtn onClick={goBackToLogin}>Back to Login</BackToLoginBtn>
          </FormActions>
        )}
      </StyledForm>
    </AuthLayout>
  );
};

export default withRouter(ResetPassword);
