/** @type {import('next').NextConfig} */
const nextConfig = {}

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  assetPrefix: isProd ? '/your-repo-name/' : '',
  basePath: isProd ? '/your-repo-name' : '',
};
