"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { passwordSchema } from "@/lib/validation-schemas"
import { CustomFormField } from "./form-components"
import { useResetPassword } from "@/services/auth"

type FormValues = z.infer<typeof passwordSchema>

export default function ResetPasswordForm(props: Props) {
  const form = useForm<FormValues>({
    resolver: zodResolver(passwordSchema)
  })
  const resetPassword = useResetPassword()

  async function onSubmit(values: FormValues) {
    resetPassword.mutate({ uid: props.uid, token: props.token, new_password: values.password })
  }

  return(
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CustomFormField
          name="password"
          label="Password"
          control={form.control}
        />
        <Button type="submit">Set New Password</Button>
      </form>
    </Form>
  )
}

type Props = {
  uid: string,
  token: string
}
