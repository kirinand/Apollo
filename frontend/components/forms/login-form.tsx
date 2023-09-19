"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { useRouter } from 'next/navigation'

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { loginSchema } from "@/lib/validation-schemas"
import { CustomFormField } from "./form-components"
import { userLogin } from "@/services/auth"
import { useAppContext } from "@/context/store"

type FormValues = z.infer<typeof loginSchema>

export default function LoginForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(loginSchema)
  })

  const { setUser } = useAppContext()
  const router = useRouter()

  async function onSubmit(values: FormValues) {
    userLogin(values.email, values.password).then((res) => {
      const user = res.user
      user.isLoggedIn = true
      setUser(user)
      router.push('/')
    }).catch((err) => {
      console.log(err.message)
    })
  }

  return(
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
        <Button type="submit">Login with Email</Button>
      </form>
    </Form>
  )
}
