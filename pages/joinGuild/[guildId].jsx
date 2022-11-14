import server from "server";

export default function JoinGuild({ guildInfo }) {
    const { id, name, icon, error } = guildInfo;

    return (
        <div>
            <div className="text-2xl">Join guild</div>

            {error ? (
                <div>{error}</div>
            ) : (
                <div>
                    <div>Guild name: {name}</div>
                    <div>Guild icon: {icon ? icon : "No icon"}</div>
                    <div>Guild ID: {id}</div>
                </div>
            )}
        </div>
    );
}

export async function getServerSideProps(context) {
    const { guildId } = context.params;

    let guildInfo = await fetch(`${server}/api/getGuildInfo`, {
        headers: { guildId },
    });

    guildInfo = await guildInfo.json();

    return {
        props: {
            guildInfo,
        },
    };
}
