import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { signUpUser } from "../actions/auth";
import { SignUpSchema } from "../types/auth";
import { useToast } from "./use-toast";

export const useSignUp = () => {
  const { toast } = useToast();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(SignUpSchema),
  });

  const { isPending, mutate } = useMutation({
    mutationFn: signUpUser,
    onSuccess: (data) => {
      if (data.status === "success") {
        toast({
          title: "Sign up successful",
          description: data.message,
        });
        router.push("/login");
      } else {
        toast({
          title: "Sign up failed",
          description: data.message,
          variant: "destructive",
        });
      }
    },
    onError: (error) => {
      toast({
        title: "Sign up failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: SignUpSchema) => {
    mutate(data);
  };

  return { isPending, handleSubmit, register, errors, onSubmit };
};
