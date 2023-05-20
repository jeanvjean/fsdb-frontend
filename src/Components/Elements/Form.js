import { default as styled } from "@emotion/styled";
import { FormInput } from "./FormInput";
import { Label } from "./Label";
import SelectField from "./SelectField";
import {Textarea} from "./Text-area"

export const Form = styled.form`
  width: 100%;
`;

Form.Input = FormInput;
Form.Select = SelectField;
Form.Label = Label;
Form.Textarea = Textarea;
