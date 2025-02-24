import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  const { pathname } = req.nextUrl;

  // geschützte Routen
  const protectedRoutes = [
    "/profile",
    "/events",
    "/events/create",
    "/event-anmeldungen",
    "/teilnehmer",
  ];

  if (protectedRoutes.includes(pathname) && !token) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/session";
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

// Configuration to match all paths except API routes, static files, images, etc.
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
