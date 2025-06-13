// next.config.mjs
import nextPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // your other Next.js config if any
};

const withPWA = nextPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

export default withPWA(nextConfig);
