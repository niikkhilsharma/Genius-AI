// @ts-nocheck

import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
// import { PrismaClient } from '@prisma/client'
import prisma from "./lib/database/dbConnect";

// const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET as string,
  theme: {
    logo: `https://avatars.githubusercontent.com/u/131470832?s=100&v=4`,
  },

  session: {
    strategy: "jwt",
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_SECRET_ID as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn(user) {
      try {
        const existingUser = await prisma.user.findUnique({
          where: {
            email: user.user.email!,
          },
        });

        if (!existingUser) {
          const isAdmin =
            user.user.email === "ns3887255@gmail.com" ? true : false;
          const newUserProfile = await prisma.profile.create({
            data: {
              name: user.user.name,
              email: user.user.email,
              emailVerified: user.user.emailVerified,
              image: user.user.image,
              isAdmin: isAdmin,
              isPro: isAdmin ? true : false,
            },
          });
        }

        return user;
      } catch (error) {
        console.error("Error creating profile:", error);
        return user;
      }
    },
    async session({ token, session }) {
      if (token) {
        const userProfile = await prisma.profile.findUnique({
          where: { email: token.email },
        });

        session.user.profile = userProfile;
      }

      return session;
    },
    async jwt({ token }) {
      const dbUser = await prisma.user.findUnique({
        where: {
          email: token.email!,
        },
      });

      token.id = dbUser?.id;

      return token;
    },
  },
};
