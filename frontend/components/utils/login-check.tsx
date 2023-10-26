"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

import { useAppContext } from "@/providers/context/app-context-providers"
import { useVerify, useRefresh } from "@/services/auth"

const LoginCheck = ({ children }: { children: React.ReactNode }) => {
  const { user, setUser } = useAppContext()
  const router = useRouter()

  const verify = useVerify()
  const refresh = useRefresh()

  useEffect(() => {
    if (!user.isLoggedIn) {
      verify.mutateAsync()
        .then((data) => {
          console.log("verify success")
          setUser({
            email: data.email,
            name: data.name,
            isLoggedIn: true
         })
        })
        .catch(() => {
          console.log("refresh success")
          refresh.mutateAsync()
            .then((data) => {
              setUser({
                email: data.email,
                name: data.name,
                isLoggedIn: true
             })
            })
            .catch(() => {
              console.log("missing or invalid token")
              router.push('/login')
            })
        })
    }
  }, [])

  
  return <>{children}</>
}

export default LoginCheck