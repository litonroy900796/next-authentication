import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {

                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                try {
                    const res = await fetch(
                        `http://localhost:5000/users?email=${credentials.email}`
                    );

                    if (!res.ok) {
                        return null;
                    }

                    const users = await res.json();
                    console.log("👤 Users found:", users);

                    if (!users || users.length === 0) {

                        return null;
                    }

                    const user = users[0];

                    // Password check
                    const isPasswordValid = credentials.password === user.password;


                    if (!isPasswordValid) {
                        return null;
                    }

                    console.log("✅ Auth successful");


                    return {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                    };
                } catch (error) {
                    console.error("Auth error:", error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
            }
            return token;
        },
        async session({ session, token }) {
            if (session?.user) {
                session.user.id = token.id as string;
                session.user.name = token.name as string;
                session.user.email = token.email as string;
            }
            return session;
        },
    },
    pages: {
        signIn: "/sign-in",
    },
    session: {
        strategy: "jwt",
    },
    debug: true,
});