"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { emailSchema } from "@/lib/validation-schemas"
import { CustomFormField } from "./form-components"
import { useForgotPassword } from "@/services/auth"
import { useInfoContext } from "@/providers/context/info-context-provider"
import constants from "@/constants"

type FormValues = z.infer<typeof emailSchema>

export default function ForgotPasswordForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(emailSchema)
  })
  const forgotPassword = useForgotPassword()
  const { setInfo } = useInfoContext()
  const router = useRouter()

  async function onSubmit(values: FormValues) {
    forgotPassword.mutateAsync({ email: values.email })
      .then(() => {
        setInfo(constants.info.resetPswdRequested.replace('{0}', values.email))
        router.push('/info')
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
        <Button type="submit">Reset Password</Button>
      </form>
    </Form>
  )
}
