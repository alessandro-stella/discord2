import Head from "next/head";
import Button from "../components/Button.jsx";
import server from "../server.js";

export default function Home(props) {
    console.log(props);

    const buttons = ["play", "go", "stop"];

    return (
        <>
            <Head>
                <title>Trading4Noobs</title>
            </Head>

            <div className="flex flex-col min-h-screen">
                <div className="m-4 text-4xl font-bold">Testing API</div>
                {buttons.map((singleButton, index) => (
                    <Button key={index} text={singleButton} />
                ))}
            </div>
        </>
    );
}

export async function getServerSideProps() {
    let response = await fetch(`${server}/api/testApi`);
    response = await response.json();

    return {
        props: { response },
    };
}
