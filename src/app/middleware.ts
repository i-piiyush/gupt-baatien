import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  if (
    token &&
    (url.pathname.startsWith("/sign-in") ||
      url.pathname.startsWith("/sign-up") ||
      url.pathname.startsWith("/verify") ||
      url.pathname === "/") 
      
      // If a token exists and the user tries to access certain routes (/sign-in, /sign-up, /verify, or /), the middleware redirects them to the dashboard (/dashboard).
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  if (!token && url.pathname.startsWith("/dashboard")) {
    // If there's no token and the user tries to access the dashboard route (/dashboard), they are redirected to the sign-in page (/sign-in).
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.redirect(new URL("/home", request.url));
}



export const config = {
  matcher: ["/dashboard/:path*", "/sign-in", "/sign-up", "/"],
};
