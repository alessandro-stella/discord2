import Image from "next/image";

export default function CustomLoader() {
    return (
        <div className="relative w-full h-full max-h-[20em] max-w-[20em] grid place-content-center">
            <div className="h-1/2 relative min-h-[10em]">
                <Image src="/loader.svg" layout="fill" />
            </div>
            <div className="w-40 h-2 bg-discordGrey-200 shadow-xl mx-auto rounded-full"></div>
        </div>
    );
}
