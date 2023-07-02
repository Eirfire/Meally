import './env.mjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['types', 'tailwind-config'],
  images: {
    domains: [
      'img.taste.com.au',
      'lh3.googleusercontent.com',
      'firebasestorage.googleapis.com',
      'facebook.com',
      'media4.giphy.com',
      // good free images websites
      'unsplash.com',
      'source.unsplash.com',
      'images.unsplash.com',
      'isorepublic.com',
      'pixabay.com',
      'pexels.com',
      'savee.com',
      'dr.savee-cdn.com',
      'via.placeholder.com',
    ],
  },
};

export default nextConfig;