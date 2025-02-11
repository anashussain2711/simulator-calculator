/** @type {import('next').NextConfig} */
const nextConfig = {}

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  assetPrefix: isProd ? '/simulator-calculator/' : '',
  basePath: isProd ? '/simulator-calculator' : '',
};
