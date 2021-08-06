
const PROXY_CONFIG = [
    {
        context: [
            "/auth/**",
            "/users/**"
            

        ],
        target: "http://localhost:7777",
        secure: false,
        logLevel: "debug"
    }
]
module.exports = PROXY_CONFIG;

