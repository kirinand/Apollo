"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { loginSchema } from "@/lib/validation-schemas";
import { CustomFormField } from "./form-components";
import { useLogin } from "@/services/auth";
import Link from "next/link";
import constants from "@/constants";

type FormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
  });

  const login = useLogin();

  async function onSubmit(values: FormValues) {
    login.mutate({ email: values.email, password: values.password });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CustomFormField name="email" label={constants.title.email} control={form.control} />
        <CustomFormField
          name="password"
          label={constants.title.password}
          type="password"
          control={form.control}
        />
        <div className="mb-2">
          <Link href="/reset-password" className="text-sm hover:underline">
            {constants.prompt.forgotPswd}
          </Link>
        </div>
        <Button className="w-full my-2" type="submit">
          {constants.prompt.loginWithEmail}
        </Button>
      </form>
    </Form>
  );
}
