/** @type {import('next').NextConfig} */
const nextConfig = {
    // Remove output: 'export'
    images: {
        unoptimized: true,
    },
    experimental: {
        appDir: false,
    }
};

export default nextConfig;