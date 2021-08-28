
const PROXY_CONFIG = [
    {
        context: [
            "/auth/**",
            "/users/**"
        ],
        target: "http://localhost:7777",
        secure: false,
        logLevel: "debug",
        changeOrigin: true
    }
]
module.exports = PROXY_CONFIG;

