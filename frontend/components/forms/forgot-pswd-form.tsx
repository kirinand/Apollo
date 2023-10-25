"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { emailSchema } from "@/lib/validation-schemas"
import { CustomFormField } from "./form-components"
import { useForgotPassword } from "@/services/auth"

type FormValues = z.infer<typeof emailSchema>

export default function ForgotPasswordForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(emailSchema)
  })
  const resetPassword = useForgotPassword()

  async function onSubmit(values: FormValues) {
    resetPassword.mutate({ email: values.email })
  }

  return(
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CustomFormField
          name="email"
          label="Email"
          control={form.control}
        />
        <Button type="submit">Reset Password</Button>
      </form>
    </Form>
  )
}
