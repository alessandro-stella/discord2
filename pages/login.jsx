import LoginButtons from "components/LoginButtons";
import { getProviders, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CustomLoader from "components/CustomLoader.jsx";
import RegisterForm from "components/RegisterForm";
import LoginForm from "components/LoginForm";

export default function Component({ providers, randomIndex }) {
    console.log({ providers });
    const router = useRouter();
    const { data: session, status } = useSession();
    const [isRegistering, setIsRegistering] = useState(false);

    useEffect(() => {
        if (status === "loading") return;
        if (session) router.push("/home");
    }, [session, status]);

    return (
        <div
            className="relative grid w-screen h-screen bg-center bg-no-repeat place-items-center"
            style={{ backgroundImage: `url('/bg${randomIndex}.png')` }}>
            <div className="bg-discordGrey-700 p-4 shadow-xl rounded-md  m-4 min-w-[30em] w-[80%] max-w-[50em] min-h-[20em] h-[70%] max-h-[50em] grid place-items-center">
                {status === "loading" ? (
                    <CustomLoader />
                ) : (
                    <>
                        {!session && (
                            <div className="w-2/3 max-w-[30em]">
                                <div className="w-full">
                                    {isRegistering ? (
                                        <RegisterForm />
                                    ) : (
                                        <LoginForm />
                                    )}
                                </div>
                                <div className="flex gap-1">
                                    <div>
                                        {isRegistering
                                            ? "Already a user?"
                                            : "Not registered yet?"}
                                    </div>
                                    <div
                                        onClick={() =>
                                            setIsRegistering(
                                                (isRegistering) =>
                                                    !isRegistering
                                            )
                                        }
                                        className="font-bold text-discordPurple hover:underline hover:decoration-discordPurple w-fit hover:cursor-pointer">
                                        {isRegistering
                                            ? "Login now"
                                            : "Join us now!"}
                                    </div>
                                </div>
                                <LoginButtons
                                    providers={providers}
                                    isRegistering={isRegistering}
                                />
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
