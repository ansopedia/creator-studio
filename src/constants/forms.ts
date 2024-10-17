export type AuthFormProps = {
  id: string;
  type: "email" | "text" | "password";
  inputType: "select" | "input" | "password";
  options?: { value: string; label: string; id: string }[];
  label?: string;
  placeholder: string;
  name: string;
  value?: string;
};

export const SIGN_UP_FORM: AuthFormProps[] = [
  {
    id: "1",
    inputType: "input",
    placeholder: "Create an unique username",
    name: "username",
    type: "text",
  },
  {
    id: "2",
    inputType: "input",
    placeholder: "Email",
    name: "email",
    type: "email",
  },
  {
    id: "3",
    inputType: "password",
    placeholder: "Create a password",
    name: "password",
    type: "password",
  },
  {
    id: "4",
    inputType: "password",
    placeholder: "Confirm password",
    name: "confirmPassword",
    type: "password",
  },
];

export const LOGIN_FORM: AuthFormProps[] = [
  {
    id: "1",
    inputType: "input",
    placeholder: "Email",
    name: "email",
    type: "email",
  },
  {
    id: "2",
    inputType: "password",
    placeholder: "Password",
    name: "password",
    type: "password",
  },
];
