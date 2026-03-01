import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { adminMiddleware } from "./middlewares/admin";
export function middleware(request: NextRequest) {
   const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/admin")) {
    return adminMiddleware(request);
  }
    return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};