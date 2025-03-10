"use client";

import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";



import toast from "react-hot-toast";
import { trpc } from "@/server/utils/trpc";
import { ILogin, loginSchema } from "@/shared/types";
import FormInput from "./ui/form-input";
import { LoadingButton } from "./ui/loading-button";

export default function LoginForm() {
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const methods = useForm<ILogin>({
    resolver: zodResolver(loginSchema),
  });

  const { reset, handleSubmit } = methods;

  const { mutate: loginFn } = trpc.loginUser.useMutation({
    onSettled() {
      setSubmitting(false);
    },
    onMutate() {
      setSubmitting(true);
    },
    onError(error) {
      toast.error(error.message);
      console.log("Error message:", error.message);
      reset({ password: "" });
    },
    onSuccess() {
      toast.success("login successfully");
      router.push("/");
    },
  });

  const onSubmitHandler: SubmitHandler<ILogin> = (values) => {
    loginFn(values);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="max-w-md w-full mx-auto overflow-hidden shadow-lg bg-ct-dark-200 rounded-2xl p-8 space-y-5"
      >
        <FormInput label="Email" name="email" type="email" />
        <FormInput label="Password" name="password" type="password" />

        <div className="text-right">
          <Link href="#" className="">
            Forgot Password?
          </Link>
        </div>
        <LoadingButton loading={submitting} textColor="text-ct-blue-600">
          Login
        </LoadingButton>
        <span className="block">
          Need an account?{" "}
          <Link href="/register" className="text-ct-blue-600">
            Sign Up Here
          </Link>
        </span>
      </form>
    </FormProvider>
  );
}
