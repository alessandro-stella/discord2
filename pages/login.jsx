import LoginButtons from "components/LoginButtons";
import { getProviders, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CustomLoader from "components/CustomLoader.jsx";

export default function Component({ providers, randomIndex }) {
    const router = useRouter();
    const { data: session, status } = useSession();

    useEffect(() => {
        console.log(status);
        if (status === "loading") return;
        if (session) router.push("/home");
    }, [session, status]);

    return (
        <div
            className="relative grid w-screen h-screen bg-center bg-no-repeat place-items-center"
            style={{ backgroundImage: `url('/bg${randomIndex}.png')` }}>
            <div className="bg-discordGrey-700 p-4 shadow-xl rounded-md  m-4 min-w-[30em] w-[80%] max-w-[50em] min-h-[20em] h-[70%] max-h-[50em] grid place-items-center">
                {status !== "loading" ? (
                    <CustomLoader />
                ) : (
                    <>
                        {!session && (
                            <div className="">
                                <div>Come on, movite</div>
                                <LoginButtons providers={providers} />
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export async function getServerSideProps() {
    const providers = await getProviders();

    return {
        props: { providers, randomIndex: Math.floor(Math.random() * 5 + 1) },
    };
}
