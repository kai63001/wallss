const path = require("path");

module.exports = {
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: 'empty'
      }
    }

    return config
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    domains: [
      "images.alphacoders.com", 
      "images1.alphacoders.com",
      "images2.alphacoders.com",
      "images3.alphacoders.com",
      "images4.alphacoders.com",
      "images5.alphacoders.com",
      "images6.alphacoders.com",
      "images7.alphacoders.com",
      "images8.alphacoders.com",
      "images9.alphacoders.com",
      "mfiles.alphacoders.com",
      "avatarfiles.alphacoders.com",
      "drive.google.com",
      "lh3.googleusercontent.com"
    ],
  },
};
