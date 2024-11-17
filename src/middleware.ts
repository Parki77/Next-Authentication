
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path=request.nextUrl.pathname
  const isPathNotOk=path=='/login'||'/signup'
  const hasToken=request.cookies.get("token")?.value||""
  if(isPathNotOk && hasToken)
  {
    return NextResponse.redirect(new URL('/profile', request.url))
  }
  
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/login',
    '/signup',
    //  '/profile'
  ],
}