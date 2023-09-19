import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(): Promise<NextResponse> {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/logout`)
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
      throw new Error(error.response.data?.error || 'Something went wrong')
    } else {
      throw new Error(error.message)
    }
  }
}

