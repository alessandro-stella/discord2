import { signIn } from "next-auth/react";
import { useState } from "react";
import InputField from "./InputField";
import SimpleLoader from "./SimpleLoader";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [errorMessage, setErrorMessage] = useState(false);

    function triggerError(msg) {
        setErrorMessage(msg);

        setTimeout(() => {
            setErrorMessage(false);
        }, 5000);
    }

    async function handleSignIn() {
        setIsLoading(true);

        await signIn("credentials", {
            email,
            password,
            redirect: false,
        })
            .then((res) => {
                if (res.error) {
                    triggerError(res.error);
                }
            })
            .catch((err) => {
                triggerError(
                    "There's been an error during the process, please try again"
                );
            });

        setIsLoading(false);
    }

    return (
        <div className="flex flex-col items-center justify-center w-full">
            <div className="text-center">
                <div className="text-3xl text-discordGrey-100 text-shadow">
                    Welcome back!
                </div>
                <div className="text-lg text-discordGrey-450 text-shadow">
                    We&apos;re so excited to see you again!
                </div>
            </div>

            <div className="flex flex-col gap-2 w-full">
                <InputField
                    type="email"
                    label="email"
                    value={email}
                    setValue={setEmail}
                />
                <InputField
                    type={isPasswordShown ? "text" : "password"}
                    label="password"
                    value={password}
                    setValue={setPassword}
                    isPasswordShown={isPasswordShown}
                    setIsPasswordShown={setIsPasswordShown}
                />

                {errorMessage && (
                    <div className="text-red-500 text-sm text-shadow">
                        {errorMessage}
                    </div>
                )}

                <div
                    onClick={() => handleSignIn()}
                    className="bg-discordPurple text-center text-white py-2 uppercase transition-all shadow-md hover:shadow-xl hover:cursor-pointer rounded-sm">
                    {isLoading ? <SimpleLoader /> : "login"}
                </div>
            </div>
        </div>
    );
}
