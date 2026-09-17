import { NextResponse } from "next/server";

export function proxy(request) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/setter/:path*",
    "/reviewer/:path*",
    "/admin/:path*",
    "/exam-center/:path*",
  ],
};