import { useRef } from "react";

export default function Overlay({ children, close }) {
    const popupRef = useRef(null);

    function handleClick(e) {
        if (e.target !== popupRef.current) {
            return;
        }

        close(false);
    }

    return (
        <div
            className={`absolute top-0 left-0 w-full h-full z-[50] grid place-content-center transition duration-500 overflow-hidden ${
                close ? "bg-[#000000cc]" : "pointer-events-none"
            }`}>
            <div
                ref={popupRef}
                onClick={(e) => handleClick(e)}
                className={`absolute w-full h-full z-[75] transition duration-300 grid place-content-center ease-[cubic-bezier(0.7,0,0.7,1.5)] ${
                    close ? "scale-1" : "scale-0"
                }`}>
                {children}
            </div>
        </div>
    );
}
