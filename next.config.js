const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');
module.exports = withSass(withCSS({
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
}));