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
    <Button onClick={handleLogout}>{constants.prompt.logout}</Button>
  )
}

export const ResetPasswordButton = (props: { email: string }) => {
  const forgotPassword = useForgotPassword()
  const { toast } = useToast()
  const handleResetPassword = async () => {
    forgotPassword.mutateAsync({ email: props.email })
      .then(() => {
        toast({ description: constants.info.resetPswdRequested.replace('{0}', constants.msg.yourEmail) })
      })
  }
  return (
    <Button onClick={handleResetPassword}>{constants.prompt.resetPassword}</Button>
  )
}

export const OAuthButton = (props: { provider: string, redirect: string }) => {
  const oAuth = useOAuth()

  return (
    <Button
      className="w-full my-2"
      onClick={() => {
        oAuth.mutate({ provider: props.provider, redirectUri: props.redirect })
      }}
    >
      <Image 
        priority
        className="mr-1.5"
        src="/icons/google.svg"
        height={20}
        width={20}
        alt=""
      />
      {constants.title.google}
    </Button>
  )
}
