import Head from "next/head";
import server from "server.js";
import connectMongo from "database/connectMongo";
import Link from "next/link";

export default function redirect() {
    return (
        <div>
            <div>Something went wrong!</div>
            <Link href="/login">Go to login</Link>
        </div>
    );
}

export async function getServerSideProps() {
    await connectMongo();

    let response = await fetch(`${server}/api/checkIfLogged`);
    let { session } = await response.json();

    return {
        /* redirect: {
            destination: `/${session ? "home" : "login"}`,
            permanent: false,
        }, */

        props: {},
    };
}
