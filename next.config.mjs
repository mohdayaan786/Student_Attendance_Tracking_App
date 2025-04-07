/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ["gravatar.com", "lh3.googleusercontent.com"], // ✅ Allowed domains
    },
  };
  
  export default nextConfig; // ✅ Correct way to export in ESM
  