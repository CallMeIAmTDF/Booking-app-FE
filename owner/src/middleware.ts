
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const privatePaths = ['/me', '/dashboard', '/users',]
const authPaths = ['/login', '/register',  '/verify']

export function middleware(request: NextRequest) {

  const { pathname } = request.nextUrl
  const accessToken = request.cookies.get('accessToken')?.value
  // Chưa đăng nhập thì không cho vào private paths 
  if (privatePaths.some((path) => pathname.startsWith(path)) && !accessToken) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  // Đăng nhập rồi thì không cho vào login/register nữa
  if (authPaths.some((path) => pathname.startsWith(path)) && accessToken) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  return NextResponse.next()
}


// See "Matching Paths" below to learn more
export const config = {
  matcher: [ '/me', '/dashboard', '/users',
    '/login', '/register',  '/verify'
  ]
}