module.exports = {
  reactStrictMode: false, //do not change this line
  webpack(config) {
    config.resolve.modules.push('src')
    return config
  },

  async rewrites() {
    return [
      {
        source: '/home',
        destination: '/',
      },
      {
        source: '/settings',
        destination: '/settings/edit-profile',
      },
      {
        source: '/signin',
        destination: '/api/auth/signin',
      },
    ]
  },

  eslint: {
    ignoreDuringBuilds: true,
  }
}
