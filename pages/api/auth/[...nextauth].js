import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import SpotifyProvider from "next-auth/providers/spotify";
import CredentialsProvider from "next-auth/providers/credentials";
import findUser from "database/functions/findUser";
import registerUser from "database/functions/registerUser";
import getUserId from "database/functions/getUserId";

export const authOptions = {
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                const userData =
                    credentials.isRegistering === "true"
                        ? await registerUser(credentials)
                        : await findUser(credentials);

                if (userData.error) {
                    throw new Error(userData.error);
                }

                return { userData };
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
        SpotifyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user };
        },

        async session({ token }) {
            return token;
        },
    },
    pages: {
        signIn: "/login",
        error: "/login",
    },
};

export default NextAuth(authOptions);
