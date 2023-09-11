import axios from 'axios'

export const userLogin = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`, {
      email,
      password
    })

    return response.data
  } catch (error: any) {
    console.log('error: Login failed', error.response.data)
  }
}