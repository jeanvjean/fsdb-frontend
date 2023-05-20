/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { withRouter, Link } from 'react-router-dom';

import {
  StyledForm,
  LogoWrapper,
  FormTitle,
  FormActions,
  BackToLoginBtn,
  SuccessMsgContainer,
} from './Styles';
import InputField from './Input';
import { Button, Logo, Text, toastMessage } from '../Elements';
import AuthLayout from '../Layouts/AuthLayout';
import { validateEmail } from './utils';
import { utils } from '../../api/utils';
import { Spinner } from '../Elements/Spinner';

export const LoginLink = styled(Text)`
  flex-basis: 40%;
  text-align: center;
  height: 100%;
  padding: 15px;
  color: ${({ theme }) => theme.colors.mediumBue};
  text-decoration: none;
  font-size: ${({ theme }) => theme.fontSizes.normal};
`;

export const ResetBtn = styled(Button)`
  flex-basis: 60%;
  background-color: ${({ theme }) => theme.colors.mediumBue};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  height: 100%;
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes.smaller};
  cursor: pointer;
  &:focus {
    outline: 0;
  }
`;

const ForgotPassword = (props) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [sendingEmail, setSendingEmail] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const validate = () => {
    const error = !validateEmail(email) ? 'Please provide a valid email address' : '';

    if (error) {
      setError(error);
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    try {
      if (isValid) {
        setSendingEmail(true);
        const res = await utils.sendResetPasswdEmail({ email });
        if (res) {
          setSuccess(
            'Your forgot password email request has been sent. You’ll receive an email with a link and instructions on how to reset your password.'
          );
        }
      }
      setSendingEmail(false);
    } catch (error) {
      setSendingEmail(false);
      if (error.response) {
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
          <h3>Forgot password</h3>
        </FormTitle>

        {Boolean(success) ? (
          <SuccessMsgContainer>{success}</SuccessMsgContainer>
        ) : (
          <InputField
            type="text"
            name="email"
            placeholder="Enter email address"
            onChange={handleChange}
            error={error}
          />
        )}

        {!Boolean(success) ? (
          <FormActions>
            <ResetBtn onClick={handleSubmit}>
              Send forgot password email {sendingEmail && <Spinner size="1rem" />}
            </ResetBtn>
            <LoginLink tag={Link} to="/login">
              Login
            </LoginLink>
          </FormActions>
        ) : (
          <FormActions>
            <BackToLoginBtn bg="mediumBue" color="white" size="smaller" onClick={goBackToLogin}>
              Back to Login
            </BackToLoginBtn>
          </FormActions>
        )}
      </StyledForm>
    </AuthLayout>
  );
};

export default withRouter(ForgotPassword);
