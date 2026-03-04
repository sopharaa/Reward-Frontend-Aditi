import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { adminMiddleware } from "./middlewares/admin";
import { staffMiddleware } from "./middlewares/staff";
import { userMiddleware } from "./middlewares/user";

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    if (pathname.startsWith("/admin")) {
        return adminMiddleware(request);
    }

    if (pathname.startsWith("/staff")) {
        return staffMiddleware(request);
    }

    // User protected + auth routes
    if (
        pathname.startsWith("/dashboard") ||
        pathname.startsWith("/redeem") ||
        pathname.startsWith("/history") ||
        pathname.startsWith("/profile") ||
        pathname === "/login" ||
        pathname === "/register"
    ) {
        return userMiddleware(request);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/admin/:path*",
        "/staff/:path*",
        "/dashboard/:path*",
        "/redeem/:path*",
        "/history/:path*",
        "/profile/:path*",
        "/login",
        "/register",
    ],
};