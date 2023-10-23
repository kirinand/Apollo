import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/verify`, {
      headers: {
        Cookie: `jwt_access=${request.cookies.get('jwt_access')?.value}; jwt_refresh=${request.cookies.get('jwt_refresh')?.value}`
      },
      withCredentials: true }
    )
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

