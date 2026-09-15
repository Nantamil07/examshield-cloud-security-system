
import { NextResponse } from "next/server";
export function middleware(req){
 return NextResponse.next();
}
export const config={matcher:["/dashboard/:path*","/setter/:path*","/reviewer/:path*","/admin/:path*","/exam-center/:path*"]};
