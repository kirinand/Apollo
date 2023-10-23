"use client"

import { useRouter } from 'next/navigation'

import { Button } from "@/components/ui/button"
import { userLogout } from "@/services/auth"

export const LogoutButton = () => {
  const router = useRouter()
  const handleLogout = async () => {
    try {
      const data = await userLogout()
      if (data?.success) {
        router.push('/login')
      }
    } catch (err: any) {
      console.log(err)
    }
  }
  return (
    <Button onClick={handleLogout}>Logout</Button>
  )
}
