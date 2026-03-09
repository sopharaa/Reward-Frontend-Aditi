import { NextRequest, NextResponse } from "next/server";

export function userMiddleware(request: NextRequest) {
    const token = request.cookies.get("user_token");
    const pathname = request.nextUrl.pathname;

    const isProtected = ["/dashboard", "/redeem", "/history", "/profile"].some((p) =>
        pathname.startsWith(p)
    );

    // Redirect unauthenticated users to home (login modal is on home page)
    if (isProtected && !token) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}


