import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest): Promise<NextResponse> {
  const { email, password, name } = await request.json()

  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/signup`, {
      email,
      password,
      name,
    })
    return NextResponse.json(response.data, {
      status: response.status,
    })
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data?.error || 'Something went wrong')
    } else {
      throw new Error(error.message)
    }
  }
}

