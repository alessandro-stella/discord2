import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import InputField from "./InputField";
import SimpleLoader from "./SimpleLoader";

export default function RegisterForm({ propEmail = "", showEmail = true }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isFormatShown, setIsFormatShown] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [errorMessage, setErrorMessage] = useState(false);

    useEffect(() => {
        if (errorMessage) {
            setTimeout(() => {
                setErrorMessage(false);
            }, 5000);
        }
    }, [errorMessage]);

    useEffect(() => {
        if (propEmail === "") return;

        setEmail(propEmail);
    }, [propEmail]);

    function validateEmail(emailToCheck) {
        const regex =
            /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

        return regex.test(emailToCheck);
    }

    function validatePassword(password) {
        const regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");

        return regex.test(password);
    }

    async function handleSignIn() {
        if (
            username === "" ||
            email === "" ||
            password === "" ||
            confirmPassword === ""
        ) {
            setErrorMessage("Please complete all fields before continuing");

            return;
        }

        if (!validateEmail(email)) {
            setErrorMessage(
                "The email entered does not comply with the required format"
            );

            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage("The passwords entered do not match");

            return;
        }

        if (!validatePassword(password)) {
            setErrorMessage("The password does not follow the expected format");

            return;
        }

        setIsLoading(true);

        await signIn("credentials", {
            username,
            email,
            password,
            isRegistering: true,
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
                    type="text"
                    label="username"
                    value={username}
                    setValue={setUsername}
                />

                {showEmail && (
                    <InputField
                        type="email"
                        label="email"
                        value={email}
                        setValue={setEmail}
                    />
                )}

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

                <div className="text-sm">
                    <div
                        onClick={() =>
                            setIsFormatShown((isFormatShown) => !isFormatShown)
                        }
                        className="font-bold text-discordPurple hover:underline hover:decoration-discordPurple w-fit hover:cursor-pointer">
                        Password format
                    </div>

                    {isFormatShown && (
                        <div className="text-discordGrey-450 text-shadow">
                            At least 8 characters in length, one lowercase
                            letter, one uppercase letter, one number and
                            (suggested but not obligatory) one special character
                            (!@#$-%^&*)
                        </div>
                    )}
                </div>

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
