import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        formats: ["image/avif", "image/webp"], // by default avif, and if not avif then webp
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
            {
                protocol: "https",
                hostname: "img.daisyui.com",
            },
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
            },
        ],
    },
};

export default nextConfig;
