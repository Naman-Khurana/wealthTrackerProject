import { NextRequest, NextResponse } from "next/server";
export function middleware(request: NextRequest){
  const authUserId = request.cookies.get('wealth-tracker-auth-userid')?.value;
    const { pathname }=request.nextUrl

    const isAuthPage=pathname=='/login' || pathname=='/register' 

  if(!authUserId && !isAuthPage){
        return NextResponse.redirect(new URL('/login',request.url));
    }

  if(authUserId && isAuthPage){
        return NextResponse.redirect(new URL('/dashboard',request.url));
    }

    return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};