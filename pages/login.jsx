import LoginButtons from "components/LoginButtons";
import { getProviders, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Component({ providers }) {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [bgIndex, setBgIndex] = useState(2);

    useEffect(() => {
        const interval = setInterval(() => {
            setBgIndex((bgIndex) => (bgIndex === 5 ? 1 : bgIndex + 1));
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (status === "loading") return;
        if (session) router.push("/home");
    }, [session]);

    const bgLink = () => "bg-[url('/bg" + bgIndex + ".png')]";

    return (
        <div className={`min-h-screen ${bgLink()}`}>
            {status === "loading" ? (
                "Loading"
            ) : (
                <>
                    {!session && (
                        <div className="">
                            <div>Come on, movite</div>
                            <div>{bgIndex}</div>
                            <LoginButtons providers={providers} />
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export async function getServerSideProps() {
    const providers = await getProviders();

    return {
        props: { providers },
    };
}
