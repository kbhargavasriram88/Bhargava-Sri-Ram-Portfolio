import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { compare, hash } from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Admin Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        await dbConnect();

        // Check if this is a fresh database
        const userCount = await User.countDocuments();
        if (userCount === 0) {
          // Auto-seed a default admin user for convenience
          const hashedPassword = await hash("admin123", 10);
          await User.create({
            name: "Admin User",
            email: "admin@example.com",
            password: hashedPassword,
            role: "admin"
          });
        }

        const user = await User.findOne({ email: credentials.email, role: "admin" }).select("+password");

        if (!user) {
          // If no user exists and it's the first login with the default admin email, let's allow setting it up
          // For a production app, we would normally seed the DB or use a signup form.
          // But to prevent errors during demo, we'll just throw:
          throw new Error("Invalid credentials");
        }

        const isPasswordValid = await compare(credentials.password, user.password);

        if (!isPasswordValid) {
          throw new Error("Invalid credentials");
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.id;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback_secret_for_dev",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
