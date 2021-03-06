/** @type {import('next').NextConfig} */

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

const defaultConfig = {
  pageExtensions: ['ts', 'tsx'],
}

const nextConfig = withMDX({
  reactStrictMode: true,
  devIndicators: {
    buildActivityPosition: 'bottom-left',
  },
  pageExtensions: [...defaultConfig.pageExtensions, 'mdx'],
  webpack: (config) => {
    config.resolve.fallback = { fs: false }

    return config
  },
})

module.exports = nextConfig
