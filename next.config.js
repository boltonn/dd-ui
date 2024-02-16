/** @type {import('next').NextConfig} */
const nextConfig = {
    // allow access to public folder
    
    // ONNX:
    // Override the default webpack configuration
    webpack: (config) => {
        // Ignore node-specific modules when bundling for the browser
        // See https://webpack.js.org/configuration/resolve/#resolvealias
        config.resolve.alias = {
            ...config.resolve.alias,
            "sharp$": false,
            "onnxruntime-node$": false,
        }
        return config;
    },

    // FastAPI
    rewrites: async () => {
        return [
            {
                source: "/api/:path*",
                destination: 
                process.env.NODE_ENV === "development"
                    ? "http://127.0.0.1:8000/:path*"
                    : "/api"
            },
            // {
            //     source: "/static-offline-docs/:path*",
            //     destination:
            //     process.env.NODE_ENV === "development"
            //         ? "http://127.0.0.1:8000/static-offline-docs/:path*"
            //         : "/static-offline-docs"
            // }
            {
                source: "/logo.png",
                destination:
                process.env.NODE_ENV === "development"
                    ? "http://127.0.0.1:8000/logo.png"
                    : "/logo.png"
            },
            {
                source: "/openapi.json",
                destination:
                process.env.NODE_ENV === "development"
                    ? "http://127.0.0.1:8000/openapi.json"
                    : "/static-offline-docs"
            },
        ]
    }
}

module.exports = nextConfig;
