import React from 'react';
import styled from '@emotion/styled/macro';

const CheckboxGroup = styled.label`
  position: relative;
  input:checked + span {
    background-color: ${({ theme, color }) =>
      theme.colors[color] || theme.colors.mediumBue};
  }
`;
const CheckboxInput = styled.input`
  position: absolute;
  opacity: 0;
  z-index: 2;
  width: 15px;
  height: 15px;
  margin-top: -3px;
`;
const CheckboxSpan = styled.span`
  width: 13px;
  height: 13px;
  display: block;
  border: 1px solid
    ${({ theme, borderColor }) => theme.colors[borderColor] || '#3C3C3C'};
  top: 0;
  left: 0;
  position: absolute;
  transition: background-color 300ms ease;
  margin-top: -3px;
  display: inline-block;
`;

export const Checkbox = ({
  color,
  borderColor,
  name,
  children,
  checked,
  indeterminate,
  onChange,
}) => {
  return (
    <CheckboxGroup htmlFor={name} color={color}>
      <CheckboxInput
        type="checkbox"
        name={name}
        checked={checked}
        indeterminate={indeterminate}
        onChange={onChange}
      />
      <CheckboxSpan borderColor={borderColor} />
      {children}
    </CheckboxGroup>
  );
};

Checkbox.defaultProps = {
  indeterminate: false,
  color: '',
  borderColor: 'grey',
  checked: false,
};
