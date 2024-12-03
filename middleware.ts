import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

export default withAuth(
  async function middleware(req) {
    const prisma = new PrismaClient().$extends(withAccelerate());

    const user = req.nextauth?.token;
    const isRequestGoingToDashboard =
      req.nextUrl.pathname.startsWith("/api/dashboard");

    const isGoingToCloudnary =
      req.nextUrl.pathname.startsWith("/api/cloudnary");

    // console.log(user)

    const profile = await prisma.profile.findUnique({
      where: {
        email: user?.email!,
      },
    });

    if (user?.isAdmin) {
      return NextResponse.next();
    }

    if ((isRequestGoingToDashboard || isGoingToCloudnary) && user?.isPro) {
      return NextResponse.next();
    } else if (
      (isRequestGoingToDashboard || isGoingToCloudnary) &&
      !user?.isPro
    ) {
      if (profile && profile.apiCallCount < 5) {
        return NextResponse.next();
      } else {
        return NextResponse.json(
          { error: "FREE TRIAL LIMIT EXCEEDED" },
          { status: 403 },
        );
      }
    }
  },
  // {
  // 	callbacks: {
  // 		authorized: ({ token }) => token?.role === 'admin',
  // 	},
  // }
);

export const config = {
  // matcher: '/((?!api/auth|auth|images|_next/static|_next/image|favicon.ico|^/$).+)',
  matcher:
    "/((?!api/auth/[^/]+$|auth|api/auth|images|_next/static|_next/image(?:/[^/]+.[^/]+)?|contact|favicon.ico|^/$|api/payment/record-payment).+)/",
};
