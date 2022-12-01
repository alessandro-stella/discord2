import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import "../styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        if (isConnected) return;

        const connect = async () => {
            let response = await fetch("/api/initialConnection");
            response = await response.json();

            setIsConnected(true);
        };

        connect();
    }, [isConnected]);

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
