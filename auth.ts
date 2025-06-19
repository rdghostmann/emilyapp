//auth.js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import bcrypt from "bcrypt";
import { connectToDB } from "./lib/connectDB";
import type { SessionStrategy } from "next-auth"; // Add this import at the top


export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectToDB();
        try {
          const { email, password } = credentials ?? {};
          if (!email || !password) {
            throw new Error("Email and password are required");
          }
          // Find user by email
          const user = await User.findOne({ email }).select("+password");

          if (!user || !user.password) {
            console.error("User not found or password missing");
            throw new Error("Invalid credentials");
          }

          // Compare passwords
          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (!isPasswordValid) {
            console.error("Invalid password attempt for email:", email);
            throw new Error("Invalid credentials");
          }

          // Return user object
          return {
            id: user._id.toString(),
            email: user.email,
            username: user.username,
            role: user.role,
          };
        } catch (error: any) {
          console.error("AUTHORIZATION ERROR:", error?.message || error);
          throw error;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt" as SessionStrategy,
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }: { token:any; user?: any }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username = user.username;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: { session:any ; token: any }) {
      session.user = {
        id: token.id,
        email: token.email,
        username: token.username,
        role: token.role,
      };
      return session;
    },
   async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      // Only allow redirects to the same origin for security
      return url.startsWith(baseUrl) ? url : baseUrl;
    }
  },
  pages: {
    signIn: "/sign-in",
    error: "/error",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
