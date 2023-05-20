import React from 'react';
import { Text } from '../Elements';

import { Input, FormGroup } from './Styles';

const InputField = ({ type, placeholder, onChange, name, error, id }) => {
  return (
    <FormGroup>
      <Input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        error={error}
        id={id}
      />
      <Text color="red" size="small">{error}</Text>
    </FormGroup>
  );
};

export default InputField;
