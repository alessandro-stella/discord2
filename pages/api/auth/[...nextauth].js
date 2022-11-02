import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import SpotifyProvider from "next-auth/providers/spotify";
import CredentialsProvider from "next-auth/providers/credentials";
import findUser from "database/functions/findUser";
import registerUser from "database/functions/registerUser";

export const authOptions = {
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                const { username, email, password } = credentials;

                const response =
                    credentials.isRegistering === "true"
                        ? await registerUser(username, email, password)
                        : await findUser(email, password);

                console.log({ response });

                if (response.error) {
                    throw new Error(response.error);
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
            if (credentials) {
                return user;
            }

            const { name, email: userEmail, image } = user;
            return { name, userEmail, image };
            /* return "/completeRegistration"; */
        },
    },
    pages: {
        signIn: "/login",
        error: "/login",
    },
};

export default NextAuth(authOptions);
