
const PROXY_CONFIG = [
    {
        context: [
            "/auth/**",
            "/users/**",
            "/order/**",
            "/panier/**",
            
        ],
        target: "http://localhost:7777",
        secure: false,
        changeOrigin: true,
        logLevel: "debug"
    }
]
module.exports = PROXY_CONFIG;

