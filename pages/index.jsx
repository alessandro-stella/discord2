import CustomLoader from "components/CustomLoader";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Index() {
    const router = useRouter();
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === "loading") return;

        if (session) router.push("/app");
        else router.push("/login");
    });

    return (
        <div className="relative grid w-screen h-screen place-items-center bg-discordGrey-700">
            <div className="m-4 p-4 rounded-md min-w-[30em] w-[80%] max-w-[50em] min-h-[20em] h-[70%] max-h-[50em] grid place-items-center">
                <CustomLoader />
            </div>
        </div>
    );
}
