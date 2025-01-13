import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns:[
      {
        protocol:"https",
        hostname:"res.cloudinary.com",
        pathname:"/dfbtssuwy/image/upload/**"
      }
    ]
  }
};

export default nextConfig;
