"use client";

import { Path } from "react-hook-form";

import { FormGenerator, Loader } from "@/components/global";
import { Button, Checkbox } from "@/components/ui";
import { Ansopedia_CONSTANTS } from "@/constants";
import { useLogin } from "@/hooks";
import { LoginSchema } from "@/types/auth";

const LoginForm = () => {
  const { isPending, handleSubmit, register, errors, onSubmit } = useLogin();

  return (
    <form className="mt-10 flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      {Ansopedia_CONSTANTS.loginForm.map((field) => (
        <FormGenerator
          {...field}
          key={field.id}
          register={register}
          errors={errors}
          name={field.name as Path<LoginSchema>}
          value={field.value}
        />
      ))}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox id="remember-me" {...register("rememberMe", { setValueAs: (value) => value === "on" })} />
          <label
            htmlFor="remember-me"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Remember me
          </label>
        </div>
        <a href="#" className="text-blue-500 hover:underline">
          Forget password?
        </a>
      </div>
      <Button type="submit" className="rounded-2xl" disabled={isPending}>
        <Loader loading={isPending}>Log In</Loader>
      </Button>
    </form>
  );
};

export default LoginForm;
