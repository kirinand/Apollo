import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { useAppContext } from '@/providers/context/app-context-providers'
import { useInfoContext } from '@/providers/context/info-context-provider'
import { useToast } from "@/components/ui/use-toast"
import constants from '@/constants'
import { set } from 'date-fns'

export const useLogin = () => {
  const router = useRouter()
  const { setUser } = useAppContext()
  const { toast } = useToast()

  return useMutation(
    async ({ email, password }: { email: string, password: string }) => {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/login`, {
        email: email,
        password: password,
      }, {
        withCredentials: true,
      })
      const data = await _getUser()

      return data
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
        toast({ description: constants.success.activateSuccess })
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
  
  return useMutation(
    async ({ email }: { email: string }) => {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users/reset_password/`, {
        email,
      })
      return response.data
    },
    {
      onSuccess: (data: any) => {
        console.log('success: Reset password request sent', data)
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
        toast({ description: constants.success.resetPswdSuccess })
        router.push('/login')
      },
      onError: (error: any) => {
        console.log('error: Password reset failed', error.message)
        toast({ description: constants.err.resetPswdFail })
      },
    }
  )
}

export const useVerify = () => {
  const { setUser } = useAppContext()

  return useMutation(
    async () => {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/verify`, {}, {
        withCredentials: true,
      })
      const data = await _getUser()

      return data
    },
    {
      onSuccess: (data: any) => {
        console.log('success: Verify succeeded')
        setUser({
          email: data.email,
          name: data.name,
          isLoggedIn: true,
        })
      },
      onError: (error: any) => {
        console.log('error: Verify failed', error.message)
      },
    }
  )
}

export const useRefresh = () => {
  const { setUser } = useAppContext()

  return useMutation(
    async () => {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/refresh`, {}, {
        withCredentials: true,
      })
      const data = await _getUser()

      return data
    },
    {
      onSuccess: (data: any) => {
        console.log('success: Refresh succeeded')
        setUser({
          email: data.email,
          name: data.name,
          isLoggedIn: true,
        })
      },
      onError: (error: any) => {
        console.log('error: Refresh failed', error.message)
      },
    }
  )
}

export const useOAuth = () => {
  const { toast } = useToast()

  return useMutation(
    async ({ provider, redirectUri }: { provider: string, redirectUri: string }) => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/o/${provider}/?redirect_uri=${
        process.env.NEXT_PUBLIC_BASE_URL
      }/oauth/${redirectUri}`, {
        withCredentials: true,
      })
      return response.data
    },
    {
      onSuccess: (data: any) => {
        if (!window) throw Error
        window.location.href = data.authorization_url
      },
      onError: () => {
        toast({ description: constants.err.generic })
      }
    }
  )
}

export const useOAuthLogin = () => {
  const router = useRouter()
  const { toast } = useToast()
  const { setUser } = useAppContext()

  return useMutation(
    async ({ provider, state, code }: { provider: string, state: string, code: string }) => {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/o/${provider}/?state=${
        encodeURIComponent(state)
      }&code=${
        encodeURIComponent(code)
      }`, {}, {
        withCredentials: true,
      })
      const data = await _getUser()

      return data
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
      onError: () => {
        toast({ description: constants.err.googleLoginFail })
        router.push('/login')
      },
    }
  )
}

export const useUpdateName = () => {
  const { toast } = useToast()
  const { setUser } = useAppContext()

  return useMutation(
    async ({ name }: { name: string }) => {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/update/name`, {
        name,
      }, {
        withCredentials: true,
      })
      return response.data
    },
    {
      onSuccess: (data: any) => {
        console.log('success: Update name succeeded', data)
        setUser(prev => ({
          ...prev,
          name: data.name,
        }))
        toast({ description: constants.success.updateNameSuccess })
      },
      onError: (error: any) => {
        console.log('error: Update name failed', error.message)
        toast({ description: constants.err.updateNameFail })
      },
    }
  )
}

const _getUser = async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users/me/`, {
    withCredentials: true,
  })
  return response.data
}