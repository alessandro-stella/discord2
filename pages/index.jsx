import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function redirect() {
    const router = useRouter();
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === "loading") return;

        if (session) router.push("/home");
        else router.push("/login");
    }, [session]);
    useEffect(() => {});

    return <div>Loading...</div>;
}
