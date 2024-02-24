import { withAuth } from 'next-auth/middleware'

export default withAuth(
	// `withAuth` augments your `Request` with the user's token.
	function middleware(req) {
		console.log('this token in from middleware', req.nextauth.token)
	}
	// {
	// 	callbacks: {
	// 		authorized: ({ token }) => token?.role === 'admin',
	// 	},
	// }
)

export const config = {
	// matcher: '/((?!api/auth|auth|images|_next/static|_next/image|favicon.ico|^/$).+)',
	matcher: '/((?!api/auth/[^/]+$|auth|api/auth|images|_next/static|_next/image|favicon.ico|^/$).+)',
}
