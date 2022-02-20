module.exports = {
  reactStrictMode: false, //do not change this line
  webpack(config) {
    config.resolve.modules.push("src");
    return config;
  },

  async rewrites() {
    return [
      {
        source: "/home",
        destination: "/",
      },
    ];
  },

  images: {
    domains: ["res.cloudinary.com"],
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
};
