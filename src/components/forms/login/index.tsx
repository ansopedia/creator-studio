"use client";

import { FormGenerator, Loader } from "@/components/global";
import { Button } from "@/components/ui";
import { Ansopedia_CONSTANTS } from "@/constants";
import { useAuthSignIn } from "@/hooks";

const LoginForm = () => {
  const { isPending, onAuthenticateUser, register, errors } = useAuthSignIn();

  return (
    <form className="mt-10 flex flex-col gap-3" onSubmit={onAuthenticateUser}>
      {Ansopedia_CONSTANTS.loginForm.map((field) => (
        <FormGenerator {...field} key={field.id} register={register} errors={errors} />
      ))}
      <div className="flex items-center justify-between">
        <label className="flex items-center">
          <input type="checkbox" {...register("rememberMe")} className="mr-2" />
          <span>Remember me</span>
        </label>
        <a href="#" className="text-blue-500 hover:underline">
          forget password?
        </a>
      </div>
      <Button type="submit" className="rounded-2xl" disabled={isPending}>
        <Loader loading={isPending}>Sign In with Email</Loader>
      </Button>
    </form>
  );
};

export default LoginForm;
