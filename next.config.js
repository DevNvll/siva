const path = require("path")
const withImages = require("next-images")
const withPWA = require("next-pwa")

const isProd = process.env.NODE_ENV === "production"

module.exports = withPWA(
  withImages({
    webpack(config, { isServer }) {
      config.resolve.alias["components"] = path.join(
        __dirname,
        "./src/components"
      )
      config.resolve.alias["session"] = path.join(__dirname, "session")
      if (!isServer) {
        config.node = {
          console: false,
          fs: "empty",
          net: "empty",
          tls: "empty",
        }
      }
      return config
    },
    pwa: {
      disable: !isProd,
      dest: "/public",
    },
  })
)
