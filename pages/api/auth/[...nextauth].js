import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  providers: [
    Providers.Auth0({
      clientId: "37Dh9H7avzvba9rtVffuYbom0yiZXtfn",
      clientSecret: "hvmTaatJaGx4pnMcKkSWezPRUJrxURiIAYMMCQrXIY0yvFqyhm2gw_KYCztho_TK",
      domain: "rozen-2007.us.auth0.com",
    }),
  ],
  pages: {
    signIn: "/signin",
  },
});