/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ["lh3.googleusercontent.com", "avatars.githubusercontent.com"],
    },
    async redirects() {
        return [
            {
                source: "/joinGuild",
                destination: "/home",
                permanent: false,
            },
        ];
    },
};

module.exports = nextConfig;
