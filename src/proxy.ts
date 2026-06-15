import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ req, token }) {
      // Only require auth for /admin routes
      const path = req.nextUrl.pathname;
      if (path.startsWith("/admin")) {
        return token?.role === "admin";
      }
      return true;
    },
  },
});

export const config = {
  matcher: ["/admin/:path*"],
};
