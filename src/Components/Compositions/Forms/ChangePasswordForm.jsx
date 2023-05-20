import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Check } from 'emotion-icons/boxicons-regular';
import { withRouter } from 'react-router-dom';
import { css } from '@emotion/core';
import { Button, FormInput, toastMessage } from '../../Elements';
import { utils } from '../../../api/utils';

const StyledForm = styled.form`
  padding: 2rem;
  display: flex;
  flex-flow: column nowrap;
`;

const CheckIcon = styled(Check)`
  width: 15px;
  height: 15px;
  margin: 0 3px;
  padding: 0;
  ${({ theme }) => `color: ${theme.colors.green4};`}
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 1rem;
`;

const PasswordDescription = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ theme }) => theme.colors.lightBlack2};
  display: flex;
  flex-flow: column nowrap;
`;

const PasswordDescriptionHeader = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.blue1};
`;

const FormButtons = styled.div`
  padding-top: 2rem;
  display: flex;
  flex-flow: row nowrap;
`;

const Validation = styled.small`
  display: flex;
  justify-content: space-between;
  min-width: 170px;
  margin: 0;
  ${({ isValid, theme }) => isValid === true && `color: ${theme.colors.green4};`}
  ${({ isValid, theme }) => isValid === false && `color: ${theme.colors.red2};`}
`;

const initialState = {
  passwordHasNumber: null,
  passwordHasUppercase: null,
  passwordLenghtValid: null,
  passwordMatch: null,
  formValues: {
    old_password: '',
    password: '',
    password_confirmation: '',
  },
  errors: {
    currentPasswordError: '',
    newPasswordError: '',
    reEnterPasswordError: '',
  },
};

const ChangePasswordForm = (props) => {
  const [state, setState] = useState(initialState);
  const [changingPwd, setChangingPwd] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    const formValues = Object.assign({}, state.formValues);

    formValues[name] = value;
    setState((prevState) => {
      return { ...prevState, formValues };
    });
    validate(formValues);
  };



  const validatePassword = (password) => {
    // const eightCharsRegex = RegExp(/[0-9a-zA-Z]{8,}$/);
    const eightCharsRegex = password?.length >= 8;
    const upperCaseRegex = RegExp(/(?=.*[a-z])(?=.*[A-Z])/);
    const containNumberRegex = RegExp(/^(?=.*\d)/);
    if (!eightCharsRegex) {
      setState((prevState) => ({
        ...prevState,
        passwordLenghtValid: false,
      }));
    }
    if (eightCharsRegex) {
      setState((prevState) => ({
        ...prevState,
        passwordLenghtValid: true,
      }));
    }

    if (!containNumberRegex.test(password)) {
      setState((prevState) => ({
        ...prevState,
        passwordHasNumber: false,
      }));
    }
    if (containNumberRegex.test(password)) {
      setState((prevState) => ({
        ...prevState,
        passwordHasNumber: true,
      }));
    }

    if (!upperCaseRegex.test(password)) {
      setState((prevState) => ({
        ...prevState,
        passwordHasUppercase: false,
      }));
    }
    if (upperCaseRegex.test(password)) {
      setState((prevState) => ({
        ...prevState,
        passwordHasUppercase: true,
      }));
    }

    return '';
  };

  const validate = (formValues) => {
    const errors = Object.assign({}, state.errors);
    errors.currentPasswordError =
      formValues.old_password.length < 8 && 'Please provide a valid password';
    errors.newPasswordError = validatePassword(formValues.password);
    if (formValues.password_confirmation !== formValues.password || !formValues.password_confirmation) {
      setState((prevState) => ({
        ...prevState,
        passwordMatch: false,
      }));
      if (formValues.password_confirmation) {
        setState((prevState) => ({
          ...prevState,
          passwordMatch: false,
        }));
        errors.reEnterPasswordError = 'Passwords do not match';
      }
    } else {
      errors.reEnterPasswordError = '';
      setState((prevState) => ({
        ...prevState,
        passwordMatch: true,
      }));
    }

    for (let key in errors) {
      if (errors[key]) {
        setState((prevState) => ({ ...prevState, errors }));
        return false;
      }
    }
    setState((prevState) => ({
      ...prevState,
      errors: initialState.errors,
    }));
    return true;
  };

  const handleSave = async (e) => {
    try {
      e.preventDefault();
      setChangingPwd(true)
      const { password, password_confirmation, old_password } = state.formValues;
      const isValid = validate(state.formValues);
      if (isValid) {
        // const res = await props.changePassword(newPassword, currentPassword);
        const res = await utils.changePassword({password, password_confirmation, old_password})
        toastMessage({
          type: 'success',
          message: 'Password changed successfully',
        });
        setChangingPwd(false)
        // props.goBack();
      }
      // setTimeout(() => {
      //   props.resetStore();
      // }, 3000);      
    } catch (error) {
      setChangingPwd(false)
      toastMessage({
        type: 'error',
        message: error?.response?.message || 'An error occured.',
      });      
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    props.goBack();
  };

  const { change_password_loading, change_password_error, change_password_success } = props;
  return (
    <StyledForm>
      <Row>
        <FormInput
          type="password"
          name="old_password"
          label="Current Password"
          onChange={handleChange}
          error={state.errors.currentPasswordError}
          noRadius
        />
      </Row>
      <Row>
        <FormInput
          type="password"
          name="password"
          label="New Password"
          onChange={handleChange}
          error={state.errors.newPasswordError}
          noRadius
        />
        <FormInput
          type="password"
          name="password_confirmation"
          label="Re-Enter Password"
          onChange={handleChange}
          error={state.errors.reEnterPasswordError}
          noRadius
        />
      </Row>
      <Row>
        <PasswordDescription>
          <PasswordDescriptionHeader>Password must have</PasswordDescriptionHeader>
          <Validation isValid={state.passwordHasUppercase}>
            Atleast 1 uppercase letter (A - Z) {state.passwordHasUppercase && <CheckIcon />}
          </Validation>
          <Validation isValid={state.passwordHasNumber}>
            At least 1 number (0 - 9) {state.passwordHasNumber && <CheckIcon />}
          </Validation>
          <Validation isValid={state.passwordLenghtValid}>
            At least 8 characters {state.passwordLenghtValid && <CheckIcon />}
          </Validation>
          <Validation isValid={state.passwordMatch}>
            Passwords must match
            {state.passwordMatch && <CheckIcon />}
          </Validation>
        </PasswordDescription>
      </Row>
      <FormButtons>
        <Button
          mr="1rem"
          color="white"
          bg="mediumBue"
          style={{ minWidth: '150px' }}
          onClick={handleSave}
          loading={changingPwd}
        >
          Save New Password
        </Button>
        <Button bg="red" color="white" onClick={handleCancel}>
          Cancel
        </Button>
      </FormButtons>
    </StyledForm>
  );
};

export default withRouter(ChangePasswordForm);
