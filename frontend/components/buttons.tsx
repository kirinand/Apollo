"use client"

import Image from "next/image"

import { Button } from "@/components/ui/button"
import { useLogout, useForgotPassword } from "@/services/auth"
import { useOAuth } from "@/services/auth"
import { useToast } from "@/components/ui/use-toast"
import constants from "@/constants"

export const LogoutButton = () => {
  const logout = useLogout()
  const handleLogout = async () => {
    logout.mutate()
  }
  return (
    <Button onClick={handleLogout}>Logout</Button>
  )
}

export const ResetPasswordButton = (props: { email: string }) => {
  const forgotPassword = useForgotPassword()
  const { toast } = useToast()
  const handleResetPassword = async () => {
    forgotPassword.mutateAsync({ email: props.email })
      .then(() => {
        toast({ description: constants.info.resetPswdRequested.replace('{0}', 'your email') })
      })
  }
  return (
    <Button onClick={handleResetPassword}>Reset Password</Button>
  )
}

export const OAuthButton = (props: { provider: string, redirect: string }) => {
  const oAuth = useOAuth()

  return (
    <Button
      onClick={() => {
        oAuth.mutate({ provider: props.provider, redirectUri: props.redirect })
      }}
    >
      <Image 
        priority
        src="@/public/icons/google.svg"
        height={32}
        width={32}
        alt=""
      />
      {constants.title.google}
    </Button>
  )
}
