import axios from 'axios'
import { useQuery, useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { useAppContext } from '@/providers/context-providers'
import { use } from 'react'

export const useLogin = () => {
  const router = useRouter()
  const { setUser } = useAppContext()

  return useMutation(
    async ({ email, password }: { email: string, password: string }) => {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/login`, {
        email: email,
        password: password,
      })
      return response.data
    },
    {
      onSuccess: (data: any) => {
        console.log('success: Login succeeded', data)
        setUser({
          email: data.email,
          name: data.name,
          isLoggedIn: true,
        })
        router.push('/')
      },
      onError: (error: any) => {
        console.log('error: Login failed', error.message)
      },
    }
  )
}

export const getUser = async (access_token: TokenType, refresh_token: TokenType) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/verify`, 
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Cookie': `jwt_access=${access_token.value}; jwt_refresh=${refresh_token?.value}`
      }
    }
  )

  if (!response.ok) {
    throw new Error(response.statusText || 'Something went wrong')
  }
  console.log(response.headers.getSetCookie())
  const data = await response.json()
  return data.user
}

export const userSignup = async (email: string, password: string, name: string) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/signup`, {
      email,
      password,
      name,
    })
    return response.data
  } catch (error: any) {
    console.log('error: Signup failed', error.message)
  }
}

export const userLogout = async () => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/logout`)
    return response.data
  } catch (error: any) {
    console.log('error: Logout failed', error.message)
  }
}

type TokenType = {
  name: string,
  value: string,
}