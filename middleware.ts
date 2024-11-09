import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export function middleware(request: NextRequest) {
  async function middleware(req: any) {
    const token = await getToken({ req });

    console.log("Token from the middleware: ", token);
    
    // Check for token and redirect if not present
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Token is present, continue to next response
    return NextResponse.next();
  }
  
  return middleware(request);
}

export const config = { matcher: ["/dashboard"] };
