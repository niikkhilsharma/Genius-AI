import { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: NextAuthOptions = {
	theme: {
		logo: `https://avatars.githubusercontent.com/u/131470832?s=100&v=4`,
	},
	providers: [
		// GithubProvider({
		// 	clientId: process.env.GITHUB_CLIENT_ID as string,
		// 	clientSecret: process.env.GITHUB_SECRET_ID as string,
		// }),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_SECRET_ID as string,
		}),
	],
	secret: process.env.NEXTAUTH_SECRET as string,
}
