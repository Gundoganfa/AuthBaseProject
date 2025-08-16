import { authMiddleware } from '@clerk/nextjs'

export default authMiddleware({
  // Public routes that don't require authentication
  publicRoutes: [
    '/',
    '/auth/sign-in',
    '/auth/sign-up',
    '/api/public',
    '/api/webhooks/clerk'
  ],
  
  // Routes that should be ignored by the middleware
  ignoredRoutes: [
    '/api/webhooks/clerk',
    '/_next/static',
    '/favicon.ico'
  ]
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
