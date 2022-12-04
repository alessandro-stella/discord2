import CustomLoader from "components/CustomLoader";
import RegisterForm from "components/RegisterForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Registration({ randomIndex }) {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [email, setEmail] = useState("loading");

    useEffect(() => {
        if (status === "loading") return;

        if (!session) {
            router.push("/login");
            return;
        }

        if (session.userData) {
            router.push("/app");
            return;
        }

        const checkUser = async () => {
            const response = await fetch("/api/getUserId", {
                headers: {
                    "Content-Type": "application/json",
                    email: session.email,
                },
            });

            let userId = await response.json();

            if (userId) {
                router.push("/app");
                return;
            }

            setEmail(session.email);
        };

        checkUser();
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
                {email === "loading" ? (
                    <CustomLoader />
                ) : (
                    <>
                        <div className="text-center">
                            <div className="text-3xl text-discordGrey-100 text-shadow">
                                You're so close!
                            </div>
                            <div className="text-lg text-discordGrey-450 text-shadow">
                                Just some few data and you'll be in, hurry up!
                            </div>
                        </div>

                        <RegisterForm propEmail={email} showEmail={false} />
                    </>
                )}
            </div>
        </div>
    );
}

export async function getServerSideProps() {
    return {
        props: { randomIndex: Math.floor(Math.random() * 5 + 1) },
    };
}
