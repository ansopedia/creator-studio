import { useState } from "react";

import { useForm } from "react-hook-form";

export const useAuthSignIn = () => {
  const [isPending, setIsPending] = useState(false);
  const {
    register,
    formState: { errors },
  } = useForm();

  const onAuthenticateUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
  };

  return { register, errors, isPending, onAuthenticateUser };
};
