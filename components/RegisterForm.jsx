import { signIn } from "next-auth/react";
import { useState } from "react";
import InputField from "./InputField";
import SimpleLoader from "./SimpleLoader";

export default function LoginForm() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

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
        <div className="flex flex-col items-center justify-center md:border-r-[1px] border-discordGrey-550 md:pr-2">
            <div className="flex flex-col w-full gap-2">
                <InputField
                    type="text"
                    label="username"
                    value={username}
                    setValue={setUsername}
                />

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

                <InputField
                    type={isPasswordShown ? "text" : "password"}
                    label="confirm password"
                    value={confirmPassword}
                    setValue={setConfirmPassword}
                    isPasswordShown={isPasswordShown}
                    setIsPasswordShown={setIsPasswordShown}
                />

                {errorMessage && (
                    <div className="text-sm text-red-500 text-shadow">
                        {errorMessage}
                    </div>
                )}

                <div
                    onClick={() => handleSignIn()}
                    className="py-2 mt-1 text-center text-white uppercase transition-all rounded-sm shadow-md select-none bg-discordPurple hover:shadow-xl hover:cursor-pointer">
                    {isLoading ? <SimpleLoader /> : "register"}
                </div>
            </div>
        </div>
    );
}
