// @ts-nocheck

import { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),
	secret: process.env.NEXTAUTH_SECRET as string,
	theme: {
		logo: `https://avatars.githubusercontent.com/u/131470832?s=100&v=4`,
	},

	session: {
		strategy: 'jwt',
	},

	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_SECRET_ID as string,
		}),
	],
	callbacks: {
		async session({ token, session }) {
			if (token) {
				session.user.isAdmin = token.isAdmin
			}

			return session
		},
		async jwt({ token }) {
			const dbUser = await prisma.user.findUnique({
				where: {
					email: token.email!,
				},
			})

			token.isAdmin = Boolean(dbUser?.isAdmin)

			return token
		},
	},
}
