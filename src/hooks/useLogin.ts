import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { useForm } from "react-hook-form";

import { IApiResponse, saveAccessToken } from "../lib/server";
import { LoginSchema } from "../types/auth";

export const useLogin = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(LoginSchema),
  });

  const { isPending, mutate } = useMutation({
    mutationFn: async (data: LoginSchema) => {
      const response: AxiosResponse<IApiResponse> = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/login`,
        data,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === "failed") {
        throw new Error(response.data.message);
      }

      const accessToken: string = response.headers.authorization;
      saveAccessToken(accessToken);

      return response.data.data;
    },
    onSuccess: () => {
      router.push("/dashboard"); // Redirect to dashboard on successful login
    },
    onError: (error) => {
      // eslint-disable-next-line no-console
      console.error("Login failed:", error);
      // Handle login error (e.g., show error message)
    },
  });

  const onSubmit = (data: LoginSchema) => {
    mutate(data);
  };

  return { isPending, handleSubmit, register, errors, onSubmit };
};
