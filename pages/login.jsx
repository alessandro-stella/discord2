import CustomLoader from "components/CustomLoader.jsx";
import LoginButtons from "components/LoginButtons";
import LoginForm from "components/LoginForm";
import RegisterForm from "components/RegisterForm";
import { getProviders, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Login({ providers, randomIndex }) {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [isRegistering, setIsRegistering] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (status === "authenticated") {
            if (session.userData) {
                router.push("/app");
                return;
            }

            const processData = async () => {
                let response;

                response = await fetch("/api/getUserId", {
                    headers: {
                        "Content-Type": "application/json",
                        email: session.email,
                    },
                });

                const userId = await response.json();

                if (!userId) {
                    router.push("/registration");
                    return;
                }

                router.push("/app");
            };

            processData();
        }

        if (status === "unauthenticated") setIsLoading(false);
    }, [session, status, router]);

    return (
        <div
            className="relative flex items-center justify-center w-screen min-h-screen bg-center bg-no-repeat h-fit bg-discordGrey-700"
            style={{ backgroundImage: `url('/bg${randomIndex}.png')` }}>
            <div
                className={`bg-discordGrey-700 m-4 p-8 shadow-xl rounded-md max-w-[50em] md:min-w-[40em] w-full max-h-[50em]${
                    status === "loading"
                        ? " grid place-items-center"
                        : " flex flex-col"
                }`}>
                {isLoading ? (
                    <CustomLoader />
                ) : (
                    <>
                        <div className="text-center">
                            <div className="text-3xl text-discordGrey-100 text-shadow">
                                {isRegistering
                                    ? "Welcome, gamer!"
                                    : "Welcome back!"}
                            </div>
                            <div className="text-lg text-discordGrey-450 text-shadow">
                                {isRegistering
                                    ? "It only takes a few steps to join us, are you ready?"
                                    : "We're so excited to see you again!"}
                            </div>
                        </div>

                        <div className="md:min-w-[40em] w-full m-auto h-fit flex-1 flex md:flex-row flex-col justify-center pt-2">
                            <div className="w-full flex-[2.5]">
                                {isRegistering ? (
                                    <RegisterForm />
                                ) : (
                                    <LoginForm />
                                )}
                                <div className="flex gap-1 pt-2 pb-2 border-b-[1px] border-discordGrey-550 md:pb-0 md:border-r-[1px] md:border-b-0">
                                    <div className="text-discordGrey-450 text-shadow">
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
                            </div>

                            <LoginButtons
                                providers={providers}
                                isRegistering={isRegistering}
                            />
                        </div>
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
