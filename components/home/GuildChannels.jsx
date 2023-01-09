import { signOut } from "next-auth/react";

export default function GuildChannels() {
    return (
        <div className="bg-red-600 flex-1 flex flex-col justify-between">
            <div>Channels</div>
            <div>
                Account
                <div
                    onClick={() =>
                        signOut({ redirect: false, callback: "/login" })
                    }>
                    Logout
                </div>
            </div>
        </div>
    );
}
