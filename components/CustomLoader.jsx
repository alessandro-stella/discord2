export default function CustomLoader() {
    return (
        <div className="relative w-full h-full max-h-[20em] max-w-[20em] grid place-content-center m-auto">
            <div
                className="h-1/2 squared relative min-h-[10em]  bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/loader.svg')" }}></div>
            <div className="w-40 h-2 mx-auto rounded-full shadow-xl bg-discordGrey-200"></div>
            <div className=" text-center p-2 text-xl text-white">Loading...</div>
        </div>
    );
}
