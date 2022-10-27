import { signIn } from "next-auth/react";
import { useState } from "react";
import InputField from "./InputField";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isPasswordShown, setIsPasswordShown] = useState(false);

    const [showError, setShowError] = useState(false);

    function triggerError() {
        setShowError(true);

        setTimeout(() => {
            setShowError(false);
        }, 5000);
    }

    async function handleSignIn() {
        await signIn("credentials", {
            email,
            password,
            redirect: false,
        })
            .then((res) => {
                if (res.error) {
                    triggerError();
                }
            })
            .catch((err) => triggerError());
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

                {showError && (
                    <div className="text-red-500 text-sm text-shadow">
                        We haven&apos;t found any user with these credentials, check
                        the email or the password and try again
                    </div>
                )}

                <div
                    onClick={() => handleSignIn()}
                    className="bg-discordPurple text-center text-white py-2 uppercase transition-all shadow-md hover:shadow-xl hover:cursor-pointer rounded-sm">
                    login
                </div>
            </div>
        </div>
    );
}
