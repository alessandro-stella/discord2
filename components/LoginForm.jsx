import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import InputField from "./InputField";
import SimpleLoader from "./SimpleLoader";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [errorMessage, setErrorMessage] = useState(false);

    useEffect(() => {
        if (errorMessage) {
            setTimeout(() => {
                setErrorMessage(false);
            }, 5000);
        }
    }, [errorMessage]);

    function validateEmail(emailToCheck) {
        const regex =
            /[a-zA-Z0-9\.!#$%&'*+-/=?^_`{|}~"(),:;<>@\[\]]+@[a-z]+\.[a-zA-Z0-9\[\]-]{2,3}/;

        return regex.test(emailToCheck);
    }

    async function handleSignIn() {
        if (email === "" || password === "") {
            setErrorMessage("Please fill all fields before continuing");

            return;
        }

        if (!validateEmail(email)) {
            setErrorMessage(
                "The email entered does not comply with the required format"
            );

            return;
        }

        setIsLoading(true);

        await signIn("credentials", {
            email,
            password,
            isRegistering: false,
            redirect: false,
        })
            .then((res) => {
                if (res.error) {
                    setErrorMessage(res.error);
                }
            })
            .catch((err) => {
                setErrorMessage(
                    "There's been an error during the process, please try again"
                );
            });

        setIsLoading(false);
    }

    return (
        <div className="flex flex-col items-center justify-center md:border-r-[1px] border-discordGrey-550 md:pr-2">
            <div className="flex flex-col w-full gap-2">
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
                    <div className="text-sm text-red-500 text-shadow">
                        {errorMessage}
                    </div>
                )}

                <div
                    onClick={() => handleSignIn()}
                    className="grid py-2 mt-1 text-center text-white uppercase transition-all rounded-sm shadow-md select-none place-content-center bg-discordPurple hover:shadow-xl hover:cursor-pointer">
                    {isLoading ? <SimpleLoader /> : "login"}
                </div>
            </div>
        </div>
    );
}
