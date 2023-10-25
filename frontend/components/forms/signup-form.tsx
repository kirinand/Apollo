"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { signupSchema } from "@/lib/validation-schemas"
import { CustomFormField } from "./form-components"
import { useSignup } from "@/services/auth"

type FormValues = z.infer<typeof signupSchema>

export default function SignupForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(signupSchema)
  })
  const signup = useSignup()
  async function onSubmit(values: FormValues) {
    signup.mutate({email: values.email, password: values.password, name: values.name})
  }

  return(
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CustomFormField
          name="name"
          label="Your Name"
          control={form.control}
        />
        <CustomFormField
          name="email"
          label="Email"
          control={form.control}
        />
        <CustomFormField
          name="password"
          label="Password"
          control={form.control}
        />
        <Button type="submit">Signup with Email</Button>
      </form>
    </Form>
  )
}
