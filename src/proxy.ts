import { NextRequest, NextResponse } from "next/server";
import { userService } from "./services/user.service";

export async function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    let isAuthenticated = false;
    let isAdmin = false;
    let isSeller = false;

    const { data } = await userService.getSession();
    if (data) {
        isAuthenticated = true;
        isAdmin = data.role === "ADMIN";
        isSeller = data.role === "SELLER";
    }
	console.log(data)
    if (!isAuthenticated) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (
        isAdmin &&
        (pathname.startsWith("/dashboard") ||
            pathname.startsWith("/seller-dashboard"))
    ) {
        return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    }

    if (
        isSeller &&
        (pathname.startsWith("/dashboard") ||
            pathname.startsWith("/admin-dashboard"))
    ) {
        return NextResponse.redirect(new URL("/seller-dashboard", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/dashboard",
        "/dashboard/:path*",
        "/seller-dashboard",
        "/seller-dashboard/:path*",
        "/admin-dashboard",
        "/admin-dashboard/:path*",
    ],
};
