import { NextResponse } from "next/server";
import { HOME_PAGE, SIGNIN_PAGE } from "./constants/link";
export default function middleware(request) {
    const authToken = request.cookies.get("authToken")?.value;
    if (!authToken) {
        return NextResponse.redirect(
            new URL(`${SIGNIN_PAGE}?from=${request.nextUrl.pathname}`, request.url)
        );
    }
}
export const config = {
    matcher: [
        "/buyer-dashboard/:path*",
        "/professional-dashboard/:path*",
        // "/email-verification",
        
    ]
};