import axios from 'axios'
import { useQuery, useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { useAppContext } from '@/providers/context/app-context-providers'
import { useInfoContext } from '@/providers/context/info-context-provider'
import { useToast } from "@/components/ui/use-toast"
import constants from '@/constants'
import { use } from 'react'

export const useLogin = () => {
  const router = useRouter()
  const { setUser } = useAppContext()
  const { toast } = useToast()

  return useMutation(
    async ({ email, password }: { email: string, password: string }) => {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/login`, {
        email: email,
        password: password,
      }, {
        withCredentials: true,
      })
      return response.data
    },
    {
      onSuccess: (data: any) => {
        console.log('success: Login succeeded')
        setUser({
          email: data.email,
          name: data.name,
          isLoggedIn: true,
        })
        router.push('/')
      },
      onError: (error: any) => {
        if (error.response?.status === 401) {
          toast({
            description: constants.msg.invalOrInact,
            duration: 10000,
          })
        }
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

export const useSignup = () => {
  const router = useRouter()
  const { setInfo } = useInfoContext()
  
  return useMutation(
    async ({ email, password, name }: { email: string, password: string, name: string }) => {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users/`, {
        email,
        password,
        name,
      })
      return response.data
    },
    {
      onSuccess: (data: any, variables) => {
        setInfo(constants.info.activationNeeded.replace('{0}', variables.email))
        console.log('success: Signup succeeded')
        router.push('/info')
      },
      onError: (error: any) => {
        console.log('error: Signup failed', error.message)
      }
    }
  )
}

export const useLogout = () => {
  const router = useRouter()
  const { setUser } = useAppContext()

  return useMutation(
    async () => {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/logout`, {}, {
        withCredentials: true,
      })
      return response.data
    },
    {
      onSuccess: (data: any) => {
        console.log('success: Logout succeeded', data)
        setUser({
          email: '',
          name: '',
          isLoggedIn: false,
        })
        router.push('/login')
      },
      onError: (error: any) => {
        console.log('error: Logout failed', error.message)
      }
    }
  )
}

export const useActivate = () => {
  const router = useRouter()
  const { toast } = useToast()
  
  return useMutation(
    async ({ uid, token }: { uid: string, token: string }) => {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users/activation/`, {
        uid,
        token,
      })
      return response.data
    },
    {
      onSuccess: (data: any) => {
        console.log('success: Activate succeeded', data)
        toast({ description: constants.msg.activateSuccess })
      },
      onError: (error: any) => {
        console.log('error: Activate failed', error.message)
        toast({ description: constants.err.activateFail })
      },
      onSettled: () => {
        router.push('/login')
      }
    }
  )
}

export const useForgotPassword = () => {
  const router = useRouter()
  const { toast } = useToast()
  const { setInfo } = useInfoContext()
  
  return useMutation(
    async ({ email }: { email: string }) => {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users/reset_password/`, {
        email,
      })
      return response.data
    },
    {
      onSuccess: (data: any, variables: { email: string }) => {
        setInfo(constants.info.resetPswdRequested.replace('{0}', variables.email))
        console.log('success: Reset password request sent', data)
        router.push('/info')
      },
      onError: (error: any) => {
        console.log('error: Failed to send reset password request', error.message)
        toast({ description: constants.err.resetPswdReqFail })
      },
    }
  )
}

export const useResetPassword = () => {
  const router = useRouter()
  const { toast } = useToast()

  return useMutation(
    async ({ uid, token, new_password }: { uid: string, token: string, new_password: string }) => {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users/reset_password_confirm/`, {
        uid,
        token,
        new_password,
      })
      return response.data
    },
    {
      onSuccess: (data: any) => {
        console.log('success: Password reset succeeded', data)
        toast({ description: constants.msg.resetPswdSuccess })
      },
      onError: (error: any) => {
        console.log('error: Password reset failed', error.message)
        toast({ description: constants.err.resetPswdFail })
      },
      onSettled: () => {
        router.push('/login')
      }
    }
  )
}

type TokenType = {
  name: string,
  value: string,
}