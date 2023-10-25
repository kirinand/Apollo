"use client"

import { Button } from "@/components/ui/button"
import { useLogout } from "@/services/auth"

export const LogoutButton = () => {
  const logout = useLogout()
  const handleLogout = async () => {
    logout.mutate()
  }
  return (
    <Button onClick={handleLogout}>Logout</Button>
  )
}
