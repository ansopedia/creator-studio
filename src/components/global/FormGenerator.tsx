import { ErrorMessage } from "@hookform/error-message";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

import { Input, Label, Textarea } from "@/components/ui";

type InputType = "select" | "input" | "textarea";
type InputTypeProps = {
  select: { options: { value: string; label: string; id: string }[] };
  input: { type: "text" | "email" | "password" | "number" };
  textarea: { lines: number };
};

type FormGeneratorProps<T extends InputType> = {
  inputType: T;
  label?: string;
  placeholder: string;
  register: UseFormRegister<FieldValues>;
  name: string;
  errors: FieldErrors<FieldValues>;
} & InputTypeProps[T];

const ErrorMessageComponent = ({ errors, name }: { errors: FieldErrors<FieldValues>; name: string }) => (
  <ErrorMessage
    errors={errors}
    name={name}
    render={({ message }) => <p className="mt-2 text-red-400">{message === "Required" ? "" : message}</p>}
  />
);

export const FormGenerator = <T extends InputType>(props: FormGeneratorProps<T>) => {
  const { inputType, label, placeholder, register, name, errors } = props;

  const commonProps = {
    id: `${inputType}-${label}`,
    placeholder,
    ...register(name),
  };

  const renderInput = () => (
    <Input
      type={(props as InputTypeProps["input"]).type}
      className="bg-themeBlack border-themeGray text-themeTextGray"
      {...commonProps}
    />
  );

  const renderSelect = () => (
    <select className="w-full rounded-lg border-[1px] bg-transparent p-3" {...commonProps}>
      {(props as InputTypeProps["select"]).options?.map((option) => (
        <option value={option.value} key={option.id} className="dark:bg-muted">
          {option.label}
        </option>
      ))}
    </select>
  );

  const renderTextarea = () => (
    <Textarea
      className="bg-themeBlack border-themeGray text-themeTextGray"
      rows={(props as InputTypeProps["textarea"]).lines}
      {...commonProps}
    />
  );

  const inputComponents = {
    input: renderInput(),
    select: renderSelect(),
    textarea: renderTextarea(),
  };

  const InputComponent = inputComponents[inputType];

  return InputComponent ? (
    <Label className="flex flex-col gap-2" htmlFor={commonProps.id}>
      {label && label}
      {InputComponent}
      <ErrorMessageComponent errors={errors} name={name} />
    </Label>
  ) : null;
};
