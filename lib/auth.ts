// Import necessary modules and providers
import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

declare module "next-auth" {
    interface Session {
        id: string;
        role: string;
    }
}

export const authOptions: any = {
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
        signOut: "/login",
        signUp: "/signup",
        error: "/auth/error",
        verifyRequest: "/auth/verify-request",
    },
    providers: [
        // GoogleProvider({
        //     clientId: process.env.GOOGLE_CLIENT_ID as string,
        //     clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        // }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const result = await sql`
                    SELECT * FROM users WHERE email = ${credentials?.email as string}
                `;

                const user = result.rows[0];

                if (user && credentials?.password) {
                    // Compare hashed password with stored password
                    const isPasswordValid = await bcrypt.compare(credentials.password as string, user.password);
                    if (isPasswordValid) {
                        return {
                            id: user.id,
                            email: user.email,
                        };
                    }
                }
                throw new Error("Invalid email or password");
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }: { token: any, user: any }) {
            if (user) {
                token.id = user.id;
                // token.role = user.role;
            }
            return token;
        },
        async session({ session, token }: { session: any, token: any }) {
            if (token) {
                session.id = token.id as string;
                // session.role = token.role as string;
            }
            return session;
        },
        async redirect({ url, baseUrl }: { url: string, baseUrl: string }) {
            if (url.startsWith("/")) return `${baseUrl}${url}`;
            else if (new URL(url).origin === baseUrl) return url;
            return baseUrl;
        },
    }
};

