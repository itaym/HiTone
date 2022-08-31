const { i18n } = require('./next-i18next.config')

module.exports = {
  compress: false,
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
  i18n,
}
