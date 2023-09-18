import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest): Promise<NextResponse> {
  const { email, password } = await request.json()

  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/login`, {
      email,
      password
    }, {
      withCredentials: true,
    })
    const nextResponse = NextResponse.json(response.data, {
      status: response.status,
    })
    if (response.headers['set-cookie']) {
      for (const cookie of response.headers['set-cookie']) {
        nextResponse.headers.append('Set-Cookie', cookie);
      }
    }
    return nextResponse

  } catch (error: any) {
    if (error.response) {
      return NextResponse.json(error.response.data)
    } else {
      return NextResponse.json({
        success: false,
        errorMessage: error.message
      })
    }
  }
}

