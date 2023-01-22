import { useEffect } from "react";

export default function Overlay({ child, close }) {
    useEffect(() => {
        console.log(close);
    }, [close]);

    

    return (
        <div className="absolute top-0 left-0 w-full h-full z-[50]">
            <div
                onClick={() => close(false)}
                className="absolute w-full h-full bg-black bg-opacity-80 z-[75]"
            />

            {child}
        </div>
    );
}
