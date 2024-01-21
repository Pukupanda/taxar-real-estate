import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export default function middleware(request) {
  let token = request.cookies.get("Taxar");
  //   console.log(token, "Taxar");

  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  //
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/edit-profile",
    "/my-property/:path*",
    "/my-booking",
    "/liked-property",
    "/change-password",
  ],
};
