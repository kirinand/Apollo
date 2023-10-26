"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"

import { useOAuthLogin } from "@/services/auth"
import { oauthGoogle } from "@/config/utils"

const GoogleOAuthPage = () => {
  const oAuthLogin = useOAuthLogin()
  const searchParams = useSearchParams()

  useEffect(() => {
    const state = searchParams.get('state') || ''
		const code = searchParams.get('code') || ''

    oAuthLogin.mutate({ provider: oauthGoogle.provider, state, code })
  }, [])

  return (
    <h1>Logging in with Google</h1>
  )
}

export default GoogleOAuthPage