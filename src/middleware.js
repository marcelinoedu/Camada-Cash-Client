import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const PUBLIC_ROUTES = [
  "/login",
  "/register",
  "/forgot-password",
  "/validate-token",
];
const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(request) {
  const url = request.nextUrl.clone();
  const pathname = url.pathname;
  const token = request.cookies.get("token")?.value;

  let isAuthenticated = false;

  if (token) {
    try {
      const { payload } = await jwtVerify(token, SECRET);
      const isExpired =
        payload.exp && payload.exp < Math.floor(Date.now() / 1000);
      if (!isExpired) {
        isAuthenticated = true;
      }
    } catch (err) {
      console.error("Token inválido:", err);
    }
  }

  const isPublic = PUBLIC_ROUTES.includes(pathname);

  if (isAuthenticated && isPublic) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  if (!isAuthenticated && !isPublic) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/auth).*)"],
};
