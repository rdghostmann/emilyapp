
// @ts-ignore
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});

const nextConfig = {
  // Add other Next.js config options here if needed
};

module.exports = withPWA(nextConfig);


  // import type { NextConfig } from "next";
  
  // const nextConfig: NextConfig = {
  //   /* config options here */
  // };
  
  // export default nextConfig;
