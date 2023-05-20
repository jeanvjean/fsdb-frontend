import { validateEmail } from '../../Auth/utils';

export const validateRep = (repData) => {
  const { errors, values } = repData;

  errors.first_name = !values.first_name ? 'Please provider first name' : '';
  errors.last_name = !values.last_name ? 'Please provider last name' : '';
  errors.phone_number = values.phone_number.length !== 11? 'Please provide a valid phone number' : '';
  errors.user_type = !values.user_type ? 'Please select userType' : '';
  errors.email = !validateEmail(values.email) ? 'Please enter a valid email address' : '';

  return { errors };
};

export const validateEditProfileFormValues = (state) => {
  const { formValues } = state;
  const errors = Object.assign({}, state.errors);

  errors.first_name = !formValues.first_name && 'Please provide your first_name';
  errors.last_name = !formValues.last_name && 'Please provide your last_name';
  errors.phone_number = !formValues.phone_number && 'Please provide your phone number';

  return { errors };
};
