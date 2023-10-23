import { NextRequest, NextResponse } from "next/server";

import { getUser } from "./services/auth";

export async function middleware(req: NextRequest) {
  const access_token = req.cookies.get("access")
	const refresh_token = req.cookies.get("refresh")
	const url = req.nextUrl.clone()
	url.pathname = "/login"

  // if (access_token && refresh_token) {
  //   try {
	// 		const user = await getUser(access_token, refresh_token)

  //     if (!user) {
  //       throw new Error("Cannot get user")
  //     }

	// 		return NextResponse.next()
  //   } catch (error) {
	// 		console.log(error)
  //     return NextResponse.redirect(url)
  //   }
  // }

	console.log('Unauthorized')
	// return NextResponse.redirect(url)

  return NextResponse.next()
}

export const config = {
	matcher: `/((?!_next|api|.*\\..*|favicon.ico|signup|login|verify|oauth).*)`
}
