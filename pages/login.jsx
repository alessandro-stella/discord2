import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Component() {
    const router = useRouter();
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === "loading") return;
        if (session) router.push("/home");
    }, [session]);

    return (
        <div>
            {status === "loading" ? (
                "Loading"
            ) : (
                <>
                    {!session && (
                        <div>
                            <div>
                                <div>Come on, log in porcoddio</div>
                                <button onClick={() => signIn()}>
                                    Sign In
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
