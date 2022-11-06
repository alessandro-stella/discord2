import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [userData, setUserData] = useState({});

    useEffect(() => {
        if (status === "loading") return;
        if (!session) {
            router.push("/login");
            return;
        }

        if (session.email) {
            const processData = async () => {
                let response;

                response = await fetch("/api/getUserId", {
                    headers: { email: session.email },
                });

                const userId = await response.json();

                if (!userId) {
                    router.push("/registration");
                    return;
                }

                response = await fetch("/api/findUser", {
                    headers: { userId: userId },
                });

                const data = await response.json();
                setUserData(data);
            };

            processData();
        } else {
            setUserData(session.user);
        }
    }, [status, session, router]);

    return (
        <div>
            {status === "loading" ? (
                "Loading"
            ) : (
                <>
                    {userData ? (
                        <div className="p-2 flex flex-col gap-4">
                            {
                                <div>
                                    <div className="w-16 h-16 relative rounded-full overflow-hidden">
                                        <Image
                                            src={userData.image}
                                            layout="fill"
                                            alt="userImage"
                                        />
                                    </div>
                                    <div>
                                        {userData.username}
                                        {userData.identifier}
                                    </div>
                                    <div>{userData.id}</div>
                                </div>
                            }

                            <div>
                                <div>E togliti su</div>
                                <button
                                    onClick={() =>
                                        signOut({
                                            redirect: false,
                                            callbackUrl: "/login",
                                        })
                                    }>
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div>Loading</div>
                    )}
                </>
            )}
        </div>
    );
}
