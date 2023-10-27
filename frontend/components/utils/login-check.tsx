"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

import { useAppContext } from "@/providers/context/app-context-providers"
import { useVerify, useRefresh } from "@/services/auth"
import Spinner from "@/components/icons/spinner"

const LoginCheck = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAppContext()
  const router = useRouter()

  const verify = useVerify()
  const refresh = useRefresh()

  useEffect(() => {
    if (!user.isLoggedIn) {
      verify.mutateAsync()
        .catch(() => {
          refresh.mutateAsync()
            .catch(() => {
              console.log("missing or invalid token")
              router.push('/login')
            })
        })
    }
  }, [])

  if (user.isLoggedIn) {
    return <>{children}</>
  } else {
    return <Spinner />
  }

}

export default LoginCheck