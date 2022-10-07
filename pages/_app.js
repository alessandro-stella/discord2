import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import "../styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    return (
        <SessionProvider session={session}>
            <Head>
                <title>Discord2</title>
            </Head>
            <Component {...pageProps} />
        </SessionProvider>
    );
}

export default MyApp;
