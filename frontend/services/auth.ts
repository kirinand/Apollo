import axios from 'axios'

export const userLogin = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`, {
      email,
      password,
    })
    return response.data
  } catch (error: any) {
    console.log('error: Login failed', error.message)
  }
}

export const getUser = async (access_token: TokenType, refresh_token: TokenType) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/verify`, 
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Cookie': `jwt_access=${access_token.value}; jwt_refresh=${refresh_token?.value}`
      }
    }
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Something went wrong')
  }

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