import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function home() {
    const router = useRouter();
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === "loading") return;
        if (!session) router.push("/login");
    }, [session, status]);

    return (
        <div>
            {status === "loading" ? (
                "Loading"
            ) : (
                <>
                    {session && (
                        <div className="p-2 flex flex-col gap-4">
                            <div>
                                <div className="w-16 h-16 relative rounded-full overflow-hidden">
                                    <Image
                                        src={session.user.image}
                                        layout="fill"
                                    />
                                </div>
                                <div>{session.user.name}</div>
                                <div>{session.user.email}</div>
                            </div>

                            <div>
                                <div>E togliti su</div>
                                <button onClick={() => signOut()}>
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
