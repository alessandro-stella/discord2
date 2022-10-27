import { signIn } from "next-auth/react";
import Image from "next/image";

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
        <div className="flex flex-col gap2">
            {Object.values(providers).map((provider, index) => {
                if (provider.id !== "credentials") {
                    return (
                        <div
                            key={index}
                            onClick={() =>
                                signIn(provider.id, { isRegistering })
                            }
                            className={`text-sm flex items-center justify-center gap-2 p-2 m-1 transition-all shadow-md hover:shadow-xl hover:cursor-pointer rounded-xl w-fit ${
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
                            <div>
                                {`${
                                    isRegistering ? "Register" : "Sign in"
                                } with ${provider.name}`}
                            </div>
                        </div>
                    );
                }
            })}
        </div>
    );
}
