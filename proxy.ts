import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Routes that require authentication
const protectedRoutes = ["/home", "/cook-book", "/saved-recipes", "/every-item", "/profile", "/macro-chef", "/master-chef", "/pantry-chef"];

// Routes only accessible when NOT logged in
const authRoutes = ["/login", "/signup"];

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const authToken = request.cookies.get("auth_token")?.value;
    const isAuthenticated = !!authToken;

    // Redirect root to /home
    if (pathname === "/") {
        return NextResponse.redirect(new URL("/home", request.url));
    }

    // If user is authenticated and tries to access auth routes, redirect to home
    if (isAuthenticated && authRoutes.some((route) => pathname.startsWith(route))) {
        return NextResponse.redirect(new URL("/home", request.url));
    }

    // If user is not authenticated and tries to access protected routes, redirect to login
    if (!isAuthenticated && protectedRoutes.some((route) => pathname.startsWith(route))) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
