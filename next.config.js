/** @type {import('next').NextConfig} */
const nextConfig = {}

const isProd = process.env.NODE_ENV === 'production';

if (typeof performance === 'undefined') {
  global.performance = require('perf_hooks').performance;
}

module.exports = {
  assetPrefix: isProd ? '/simulator-calculator/' : '',
  basePath: isProd ? '/simulator-calculator' : '',
};
