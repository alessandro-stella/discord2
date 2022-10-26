import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export default function InputField({
    label,
    value,
    setValue,
    type,
    isPasswordShown = "noPassword",
    setIsPasswordShown,
}) {
    return (
        <div className="w-full">
            <div className="text-sm">{label.toUpperCase()}</div>
            <input
                className="rounded-sm w-full px-2 py-1 transition-all border-2 outline-none border-discordGrey-850 bg-discordGrey-800 focus:border-discordPurple text-discordGrey-100"
                type={type}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            {isPasswordShown !== "noPassword" && (
                <div
                    onClick={() =>
                        setIsPasswordShown(
                            (isPasswordShown) => !isPasswordShown
                        )
                    }>
                    {isPasswordShown ? <AiFillEye /> : <AiFillEyeInvisible />}
                </div>
            )}
        </div>
    );
}
