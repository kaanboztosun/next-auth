import NextAuth, { NextAuthOptions, Session, User, Account, Profile, SessionStrategy } from "next-auth";
import type { JWT } from "next-auth/jwt";
import Auth0Provider from "next-auth/providers/auth0";

export const authOptions: NextAuthOptions = {
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      issuer: `https://${process.env.AUTH0_DOMAIN}`,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt" as SessionStrategy,
  },
  callbacks: {
    async jwt({ token, account }: { token: JWT; account?: Account | null }) {
      if (account) {
        token.accessToken = account.access_token;

       
        try {
          const res = await fetch(`https://${process.env.AUTH0_DOMAIN}/userinfo`, {
            headers: {
              Authorization: `Bearer ${account.access_token}`,
            },
          });
          const userinfo = await res.json();
          
          token.role = userinfo["https://your-domain/roles"]?.[0] || "user";
        } catch (e) {
          token.role = "user";
        }
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      (session as any).accessToken = token.accessToken;
      (session as any).role = token.role || "user";
      return session;
    },
  },
};

export default NextAuth(authOptions);