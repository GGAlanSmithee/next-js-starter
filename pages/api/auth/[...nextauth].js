import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { authenticate, markAsSignedIn, markAsSignedOut } from "../../../lib/auth-functions"

const AuthHandler = NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const user = await authenticate(credentials)

          // Any object returned will be saved in `user` property of the JWT
          // If you return null then an error will be displayed advising the user to check their details.
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
          return user || null
        } catch {
          return null
        }
      },
    }),
  ],
  events: {
    async signIn({ user }) {
      await markAsSignedIn(user.email)
    },
    async signOut({ token }) {
      await markAsSignedOut(token.email)
    },
  },
  // NOTE(Alan): Provide custom pages. OBS. If you use a custom server, this does not fully work
  // because there is something wrong with the next-auth routing on redirects
  pages: {
    signIn: "/auth/sign-in",
    newUser: "/auth/signed-up",
  },
})

export default AuthHandler
