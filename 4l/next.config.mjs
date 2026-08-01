/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        // Images déposées depuis /admin (bucket `l4-media`). Les images
        // d'origine restent servies depuis `public/` en chemin relatif.
        protocol: 'https',
        hostname: 'supabase.tomrambeau.fr',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;
