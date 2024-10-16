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
    placeholder: "First name",
    name: "firstname",
    type: "text",
  },
  {
    id: "2",
    inputType: "input",
    placeholder: "Last name",
    name: "lastname",
    type: "text",
  },
  {
    id: "3",
    inputType: "input",
    placeholder: "Email",
    name: "email",
    type: "email",
  },
  {
    id: "4",
    inputType: "input",
    placeholder: "Password",
    name: "password",
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
