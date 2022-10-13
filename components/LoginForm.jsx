import { useEffect, useState } from "react";
import InputField from "./InputField";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isPasswordShown, setIsPasswordShown] = useState(false);

    useEffect(() => {
        console.log(email);
    }, [email]);

    return (
        <div>
            <div>Welcome back!</div>
            <div>We're so excited to see you again!</div>

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
            />

            <button
                onClick={() => {
                    setIsPasswordShown((isPasswordShown) => !isPasswordShown);
                }}>
                Show password
            </button>
        </div>
    );
}
