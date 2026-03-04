import { NextRequest, NextResponse } from "next/server";

export function userMiddleware(request: NextRequest) {
    const token = request.cookies.get("user_token");
    const pathname = request.nextUrl.pathname;

    const isProtected = ["/dashboard", "/redeem", "/history", "/profile"].some((p) =>
        pathname.startsWith(p)
    );
    const isAuthPage = pathname === "/login" || pathname === "/register";

    // Redirect unauthenticated users away from protected routes
    if (isProtected && !token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // Redirect already-logged-in users away from login/register
    if (isAuthPage && token) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
}


