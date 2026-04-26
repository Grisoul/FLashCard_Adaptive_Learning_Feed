/** @type {import('next').NextConfig} */
// next.config.ts
const nextConfig = {
    webpack: (config) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            "pdfjs-dist": false,
        };
        return config;
    },
    experimental: {
        serverComponentsExternalPackages: ["pdf-parse"],
    },
};

export default nextConfig
