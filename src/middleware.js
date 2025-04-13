import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const PUBLIC_ROUTES = ["/login", "/register", "/forgot-password", "/validate-token"];

export async function middleware(request) {
  const url = request.nextUrl.clone();
  const pathname = url.pathname;

  const token = request.cookies.get("token")?.value;
  let isAuthenticated = false;

  if (token) {
    try {
      const res = await fetch(`${process.env.BACKEND_URL}/auth/auth_check`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      isAuthenticated = res.ok;
    } catch (err) {
      console.error("Erro ao verificar token:", err);
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
    matcher: [
      "/((?!_next/static|_next/image|favicon.ico|api/auth).*)"
    ],
  };
  
