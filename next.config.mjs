/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'covers.openlibrary.org',
                port: '',
                pathname: '/b/isbn/**'
            },
            {
                protocol: 'https',
                hostname: 'kdfty63zg3p3ls2v.public.blob.vercel-storage.com',
                port: ''
            }
        ]
    }
};

export default nextConfig;
