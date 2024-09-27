import { AuthFormProps, LOGIN_FORM, SIGN_UP_FORM } from "./forms";

type AnsopediaConstantsProps = {
  signUpForm: AuthFormProps[];
  loginForm: AuthFormProps[];
};

export const Ansopedia_CONSTANTS: AnsopediaConstantsProps = {
  signUpForm: SIGN_UP_FORM,
  loginForm: LOGIN_FORM,
};
