// auth.ts
import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import User, { IUser } from "@/models/User";
import { connectToDB } from "@/lib/connectDB";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectToDB();

        const email = credentials?.email?.trim();
        const password = credentials?.password;

        if (!email || !password) throw new Error("Email and password are required");

        const user = await User.findOne({ email }).lean<IUser>();
        if (!user || !user.password) throw new Error("Invalid credentials");

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) throw new Error("Invalid credentials");

        return {
          id: String(user._id),
          email: user.email,
          username: user.username,
          role: user.role,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id;
        token.email = user.email;
        token.username = (user as any).username;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id as string,
        email: token.email as string,
        username: (token as any).username as string,
        role: (token as any).role as "user" | "admin",
      };
      return session;
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
  pages: {
    signIn: "/sign-in",
    error: "/error",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
