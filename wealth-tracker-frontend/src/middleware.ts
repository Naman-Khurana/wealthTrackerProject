import { NextRequest, NextResponse } from "next/server";
export function middleware(request: NextRequest){
    const token =request.cookies.get('jwt')?.value;
    const { pathname }=request.nextUrl

    const isAuthPage=pathname=='/login' || pathname=='/register' 

    if(!token && !isAuthPage){
        return NextResponse.redirect(new URL('/login',request.url));
    }

    if(token && isAuthPage){
        return NextResponse.redirect(new URL('/dashboard',request.url));
    }

    return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};