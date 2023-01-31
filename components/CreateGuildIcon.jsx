import { useRef } from "react";
import { BsPlusLg } from "react-icons/bs";

export default function CreateGuildIcon({ setLabelData, createGuild }) {
    const icon = useRef(null);

    function getCoords(elem) {
        let box = elem.getBoundingClientRect();
        let body = document.body;
        let docEl = document.documentElement;
        let scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
        let clientTop = docEl.clientTop || body.clientTop || 0;
        let top = box.top + scrollTop - clientTop;
        let style = window
            .getComputedStyle(icon.current, null)
            .getPropertyValue("font-size");
        let fontSize = parseFloat(style);

        return Math.round(top + fontSize * 1.5);
    }

    const showLabel = () => {
        const distanceFromTop = getCoords(icon.current);

        setLabelData({
            text: "Create guild",
            distanceFromTop,
        });
    };

    const hideLabel = () => {
        setLabelData({
            text: "",
            distanceFromTop: 0,
        });
    };

    return (
        <div className="relative w-full transition-all aspect-square px-2">
            <div className="relative w-full px-1 py-1">
                <div
                    onFocus={showLabel}
                    onMouseEnter={showLabel}
                    onClick={createGuild}
                    onMouseLeave={hideLabel}
                    ref={icon}
                    className={`text-green-500 hover:text-discordGrey-100 text-shadow h-full w-full aspect-square grid place-content-center hover:cursor-pointer relative rounded-[2rem] hover:rounded-2xl bg-discordGrey-650 hover:bg-green-500 transition-all`}>
                    <BsPlusLg />
                </div>
            </div>
        </div>
    );
}
