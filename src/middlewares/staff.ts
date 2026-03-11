import { NextRequest, NextResponse } from "next/server";

export function staffMiddleware(request: NextRequest) {
    const token = request.cookies.get("staff_token");

    const isStaffRoute = request.nextUrl.pathname.startsWith("/staff");
    const isLoginPage = request.nextUrl.pathname === "/staff/login";

    if (isStaffRoute && !isLoginPage) {
        if (!token) {
            return NextResponse.redirect(new URL("/staff/login", request.url));
        }
    }

    if (isLoginPage && token) {
        return NextResponse.redirect(new URL("/staff/orders", request.url));
    }

    return NextResponse.next();
}
