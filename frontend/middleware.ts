import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function middleware(req: NextRequest) {
  const access_token = req.cookies.get("jwt_access")
	const refresh_token = req.cookies.get("jwt_refresh")
	const url = req.nextUrl.clone()
	url.pathname = "/login"

  if (access_token) {
    try {
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

			const user = data.user

      if (user) {
        return NextResponse.next()
      }
    } catch (error) {
			console.log(error)
      return NextResponse.redirect(url)
    }
  }
	return NextResponse.redirect(url)
}

export const config = {
	matcher: `/((?!_next|api|.*\\..*|favicon.ico|signup|login).*)`
}
