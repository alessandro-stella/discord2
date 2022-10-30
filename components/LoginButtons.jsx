import { signIn } from "next-auth/react";
import Image from "next/image";
import server from "server.js";

export default function LoginButtons({ providers, isRegistering }) {
    const styles = {
        google: { button: "bg-google", icon: "" },
        github: {
            button: "bg-github text-white",
            icon: "grayscale brightness-[5000]",
        },
        spotify: {
            button: "bg-spotify text-white",
            icon: "grayscale brightness-[5000]",
        },
    };

    return (
        <div className="flex flex-col flex-1 gap-2 pt-2 md:pt-0 md:pl-2">
            <div className="text-lg text-discordGrey-450 text-shadow">
                Other ways to {isRegistering ? "register" : "sign in"}
            </div>
            <div className="flex flex-col flex-1 gap-2">
                {Object.values(providers).map((provider, index) => {
                    if (provider.id !== "credentials") {
                        return (
                            <div
                                key={index}
                                onClick={() =>
                                    signIn(provider.id, {
                                        isRegistering,
                                        callbackUrl: `${server}/login`,
                                    })
                                }
                                className={`select-none text-sm flex items-center justify-center gap-2 py-2 transition-all shadow-md hover:shadow-xl hover:cursor-pointer rounded-md w-full ${
                                    styles[provider.id].button
                                }
                            `}>
                                <div
                                    className={`relative w-4 h-4 ${
                                        styles[provider.id].icon
                                    }`}>
                                    <Image
                                        src={`/${provider.id}Logo.svg`}
                                        layout="fill"
                                        alt="buttonLogo"
                                    />
                                </div>
                                <div className="md:text-base">
                                    {`${
                                        isRegistering ? "Register" : "Sign in"
                                    } with ${provider.name}`}
                                </div>
                            </div>
                        );
                    }
                })}
            </div>
        </div>
    );
}
