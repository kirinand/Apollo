"use client"

import { useRouter } from 'next/navigation'

import { Button } from "@/components/ui/button"
import { userLogout } from "@/services/auth"

const page = () => {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      const { success } = await userLogout()
      if (success) {
        router.push('/login')
      }
    } catch (err: any) {
      console.log(err.message)
    }
  }
  return (
    <div>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  )
}

export default page