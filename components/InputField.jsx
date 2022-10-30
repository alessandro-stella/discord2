import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export default function InputField({
    label,
    value,
    setValue,
    type,
    isPasswordShown = "noPassword",
    setIsPasswordShown = null,
}) {
    return (
        <div className="w-full relative">
            <div className="text-sm text-discordGrey-450 text-shadow">
                {label.toUpperCase()}
            </div>
            <input
                className={`rounded-sm w-full px-2 py-1 transition-all border-2 outline-none border-discordGrey-850 bg-discordGrey-800 focus:border-discordPurple text-discordGrey-100 focus:shadow-xl ${
                    isPasswordShown !== "noPassword" ? "pr-8" : ""
                }`}
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
                    }
                    className="absolute right-[0.4em] bottom-[0.4em] text-xl text-discordGrey-450 hover:cursor-pointer ">
                    {isPasswordShown ? <AiFillEye /> : <AiFillEyeInvisible />}
                </div>
            )}
        </div>
    );
}
