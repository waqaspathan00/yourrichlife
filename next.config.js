const withPWA = require("next-pwa")

module.exports = withPWA({
    webpack: (config) => {
        config.resolve.extensions.push(".ts", ".tsx");
        return config;
    },
    pwa: {
        dest: "public"
    },
})