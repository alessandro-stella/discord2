import { useState } from "react";
import InputField from "./InputField";

export default function CreateGuildForm({ create, setIsCreatingGuild }) {
    const [newGuildName, setNewGuildName] = useState("");

    function handleCloseForm() {
        setIsCreatingGuild(false);
    }

    return (
        <div className="bg-cyan-300 m-2">
            <div className="text-2xl">Creating guild</div>

            <InputField
                label="Nome"
                value={newGuildName}
                setValue={setNewGuildName}
                type="text"
            />

            <div className="flex gap-2">
                <div
                    className="p-2 bg-green-400"
                    onClick={() => create(newGuildName)}>
                    Create
                </div>
                <div
                    className="p-2 bg-red-400"
                    onClick={() => handleCloseForm(false)}>
                    Close
                </div>
            </div>
        </div>
    );
}
