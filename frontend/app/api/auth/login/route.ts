import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest): Promise<NextResponse> {
  const { email, password } = await request.json()

  try {
    const response = await axios.post(`${process.env.BACKEND_BASE_URL}/user/login`, {
      email,
      password
    })

    return NextResponse.json(response.data)
  } catch (error: any) {
    console.log(error.response.data)
    return NextResponse.json(error.response.data)
  }
}

