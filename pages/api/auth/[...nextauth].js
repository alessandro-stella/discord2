import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import SpotifyProvider from "next-auth/providers/spotify";
import CredentialsProvider from "next-auth/providers/credentials";
import findUser from "database/functions/findUser";

export const authOptions = {
    providers: [
        CredentialsProvider({
            async authorize(credentials, req) {
                const { email, password, isRegistering } = credentials;

                const response = await findUser(email, password);

                if (!response) {
                    throw new Error(
                        "We haven't found any user with these credentials, check the email or the password and try again"
                    );
                }

                return response.user;
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
        async signIn({ user, credentials }) {
            console.log({ credentials, user });

            if (credentials) {
                return user;
            }

            const { name, email: userEmail, image } = user;
            return { name, userEmail, image };
        },
    },
    pages: {
        signIn: "/login",
        error: "/login",
    },
};

export default NextAuth(authOptions);
