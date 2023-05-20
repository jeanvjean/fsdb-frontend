import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { withRouter } from 'react-router-dom';
import { validateEditProfileFormValues } from './utils';

import { Button, FormInput, toastMessage } from '../../Elements';
import { utils } from '../../../api/utils';
import { useUser } from '../../../hooks/useUser';
import { ROLES } from '../Sidebar/sidebarData';

const StyledForm = styled.form`
  padding: 2rem;
`;

const FormInputs = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 1rem;
`;

const FormButtons = styled.div`
  padding-top: 2rem;
  display: flex;
`;

const initialState = {
  formValues: {
    first_name: '',
    last_name: '',
    phone_number: '',
  },
  errors: {
    first_name: '',
    last_name: '',
    phone_number: '',
  },
};

const EditProfileForm = (props) => {
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [diasbleField, setDisableField] = useState(false);

  // const { user } = useSelector(({ users }) => ({
  //   user: users.user,
  // }));
  const {user, setUser, role} = useUser()

  useEffect(() => {
    if (user) {
      setState((s) => ({
        ...s,
        formValues: {
          ...s.formValues,
          first_name: user.first_name,
          last_name: user.last_name,
          phone_number: user.phone_number,
        },
      }));
      setDisableField(role === ROLES.ADMIN ? false : true)
    }
  }, [user]);

  const handleChange = (e) => {
    const { formValues } = state;
    formValues[e.target.name] = e.target.value;
    setState((s) => ({ ...s, formValues }));
  };
  const validate = () => {
    const { errors } = validateEditProfileFormValues(state);

    for (let key in errors) {
      if (errors[key]) {
        setState((prevState) => ({ ...prevState, errors }));
        return false;
      }
    }
    if (props.avatarErr) {
      return false;
    }
    setState((prevState) => ({
      ...prevState,
      errors: initialState.errors,
    }));
    return true;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      if (validate()) {
        const res = await utils.updateProfile({
          first_name: state.formValues.first_name,
          last_name: state.formValues.last_name,
          phone_number: state.formValues.phone_number,
        });
        if(res.status === 200) {
          setLoading(false)
          setUser(res.data.data)

          setState((s) => ({
            ...s,
            formValues: {
              ...s.formValues,
              first_name: res.data.data.first_name,
              last_name: res.data.data.last_name,
              phone_number: res.data.data.phone_number,
            },
          }));
        }
        toastMessage({ type: 'success', message: 'Profile updated successfully' });
      }
      props.setProgress(0);
    } catch (error) {
      setLoading(false)
      if (error.response) {
        toastMessage({
          type: 'error',
          message: error.response?.data?.message,
        });
      }
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    props.goBack();
  };

  return (
    <StyledForm>
      <FormInputs>
        <FormInput
          type="text"
          label="First Name"
          name="first_name"
          placeholder="Enter First Name"
          defaultValue={user?.first_name}
          error={state.errors.first_name}
          onChange={handleChange}
          noRadius
          disabled={diasbleField}
        />
        <FormInput
          type="text"
          label="Last Name"
          name="last_name"
          placeholder="Enter Last Name"
          defaultValue={user?.last_name}
          error={state.errors.last_name}
          onChange={handleChange}
          noRadius
          disabled={diasbleField}
        />
        <FormInput
          type="tel"
          label="Phone Number"
          name="phone_number"
          placeholder="Enter Phone Number"
          defaultValue={user?.phone_number}
          error={state.errors.phone_number}
          onChange={handleChange}
          noRadius
          disabled={diasbleField}
        />
      </FormInputs>
      <FormButtons>
        <Button color="white" mr="1rem" bg="mediumBue" onClick={handleSave} loading={loading}>
          Save
        </Button>
        <Button color="white" bg="red" onClick={handleCancel}>
          Cancel
        </Button>
      </FormButtons>
    </StyledForm>
  );
};

export default withRouter(EditProfileForm);
