import RegisterForm from "components/RegisterForm";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Registration() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [email, setEmail] = useState("loading");

    async function handleGoBack() {
        await signOut({ redirect: false });
        router.push("/login");
    }

    useEffect(() => {
        if (status === "loading") return;

        if (!session) {
            router.push("/login");
            return;
        }

        if (session.userData) {
            router.push("/home");
            return;
        }

        const checkUser = async () => {
            const response = await fetch("/api/getUserId", {
                headers: { email: session.email },
            });

            let userId = await response.json();

            if (userId) {
                router.push("/home");
                return;
            }

            setEmail(session.email);
        };

        checkUser();
    }, [session, status, router]);

    return (
        <div>
            {email === "loading" ? (
                <div>Loading</div>
            ) : (
                <RegisterForm propEmail={email} showEmail={false} />
            )}

            <div onClick={() => handleGoBack()}>Go back</div>
        </div>
    );
}
