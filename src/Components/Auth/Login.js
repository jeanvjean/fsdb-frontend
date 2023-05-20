/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  StyledForm,
  LogoWrapper,
  Img,
  FormTitle,
  FormActions,
  LoginBtn,
  ForgotPwdLink,
} from './Styles';
import { withRouter } from 'react-router-dom';
import InputField from './Input';
import PasswordInput from './PasswordInput';
import AuthLayout from '../Layouts/AuthLayout';
import { Logo } from '../Elements';
import { validateEmail } from './utils';
import { loginAction } from '../../redux/actions/auth.actions';
import { toastMessage } from '../Elements';
import { useUser } from '../../hooks/useUser';
import { utils } from '../../api/utils';

const initialState = {
  values: {
    email: '',
    password: '',
  },
  errors: {
    email: '',
    password: '',
  },
};

const Login = (props) => {
  const dispatch = useDispatch();
  const [state, setState] = useState(initialState);
  const [loginErr, setLoginErr] = useState(false);
  const {setUser, setRole} =useUser()

  const login = useCallback((payload) => dispatch(loginAction(payload)), [dispatch]);

  const { loading, error, loggedInUser, user } = useSelector(({ auth, users }) => ({
    loading: auth.loginLoading,
    error: auth.loginError,
    loggedInUser: auth.loggedInUser,
    user: users?.user,
  }));

  const handleChange = (e) => {
    e.persist();
    setState((prevRep) => ({
      ...prevRep,
      values: {
        ...prevRep.values,
        [e.target.name]: e.target.value,
      },
    }));
  };

  const validate = () => {
    const { errors, values } = { ...state };
    errors.email = !validateEmail(values.email) ? 'Please provide a valid email address' : '';
    errors.password = values.password.length < 8 ? 'Please provide a valid password' : '';

    if (errors?.email || errors?.password) {
      setState({ ...state, errors });
      return false;
    }
    setState({
      ...state,
      errors: initialState.errors,
    });
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const isValid = validate();
    try {
      if (isValid) {
        const res = await login(state.values);
        if (res.status === 200) {
          localStorage.setItem('token', res.data.data.token);
          const user = await utils.getLoggedInUser();
          setUser({
            ...user.data.data
          });
          setRole(user.data.data.role)

          toastMessage({ type: 'success', message: 'Successfully logged in' });
          props.history.push('/dashboard');
          // if (res.data.data.userType === 'partner') {
          //   // return props.history.push('/disbursements-logs');
          //   props.history.push('/dashboard');
          // } else {
          //   props.history.push('/dashboard');
          // }
        }
      }
    } catch (error) {
      // toastMessage({ type: 'error', message: error.response?.message || 'error logging in' });
      
    }
  };

  return (
    <AuthLayout>
      <StyledForm>
        <LogoWrapper>
          <Logo height={100} width={'100%'} />
        </LogoWrapper>

        <FormTitle>
          <h3>Login</h3>
        </FormTitle>
        <InputField
          onChange={handleChange}
          type="email"
          name="email"
          placeholder="Email Address"
          error={state.errors.email}
        />

        <PasswordInput
          onChange={handleChange}
          name="password"
          placeholder="Password"
          error={state.errors.password}
          page="login"
        />

        <FormActions>
          <LoginBtn onClick={handleLogin} loading={loading}>
            Login
          </LoginBtn>
          <ForgotPwdLink to="/forgot-password">Forgot Password?</ForgotPwdLink>
        </FormActions>
      </StyledForm>
    </AuthLayout>
  );
};

export default withRouter(Login);
