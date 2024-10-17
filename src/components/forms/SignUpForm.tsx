"use client";

import { Path } from "react-hook-form";

import { FormGenerator, Loader } from "@/components/global";
import { Button } from "@/components/ui";
import { Ansopedia_CONSTANTS } from "@/constants";
import { useSignUp } from "@/hooks";
import { SignUpSchema } from "@/types/auth";

export const SignUpForm = () => {
  const { isPending, handleSubmit, register, errors, onSubmit } = useSignUp();

  return (
    <form className="mt-10 flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      {Ansopedia_CONSTANTS.signUpForm.map((field) => (
        <FormGenerator
          {...field}
          key={field.id}
          register={register}
          errors={errors}
          name={field.name as Path<SignUpSchema>}
          value={field.value}
        />
      ))}
      <Button type="submit" className="rounded-2xl" disabled={isPending}>
        <Loader loading={isPending}>Sign Up</Loader>
      </Button>
    </form>
  );
};
