/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['res.cloudinary.com'], // ✅ Allow Cloudinary
        qualities: [85,75],
    },
};

export default nextConfig;

