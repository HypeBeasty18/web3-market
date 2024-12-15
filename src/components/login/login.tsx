"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ILogin, loginSchema } from "@/shared/types";
import { trpc } from "@/server/utils/trpc";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export function Login() {
  const [submitting, setSubmitting] = useState(false);

  const router = useRouter();

  const form = useForm<ILogin>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: loginFn } = trpc.loginUser.useMutation({
    onMutate() {
      setSubmitting(true);
    },
    onSettled() {
      setSubmitting(false);
    },
    onError(error) {
      form.reset({ password: "" });
      toast.error(error.message);
      console.log("Error message:", error.message);
    },
    onSuccess() {
      toast.success("registered successfully");
      router.push("/");
    },
  });

  // Обработка отправки формы
  const onSubmit = (data: ILogin) => {
    loginFn(data);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={submitting}>
          Submit
        </Button>
      </form>
    </Form>
  );
}
