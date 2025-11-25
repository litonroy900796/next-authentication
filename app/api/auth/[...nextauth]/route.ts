import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        try {
          // JSON Server check
          const res = await axios.get(`http://localhost:5000/sign?email=${credentials.email}&password=${credentials.password}`);
          const user = res.data[0];
          if (user) return { id: user.id, name: user.fullName, email: user.email };
          return null;
        } catch {
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt" }, // use JWT for App Router
  pages: { signIn: "/signin" }, // optional custom signIn page
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
