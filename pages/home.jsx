import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function home() {
    const router = useRouter();
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === "loading") return;

        if (!session) router.push("/login");
    }, [session]);

    return (
        <div>
            {status === "loading" ? (
                "Loading"
            ) : (
                <>
                    {session && (
                        <div>
                            <div>
                                <div>E togliti dal cazzo su</div>
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
