/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['live.staticflickr.com'],
    },
    typescript: {
        ignoreBuildErrors: true,
    },
}

module.exports = nextConfig
