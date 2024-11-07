const {
    PHASE_DEVELOPMENT_SERVER,
    PHASE_PRODUCTION_BUILD,
  } = require("next/constants");
  
  /** @type {(phase: string, defaultConfig: import("next").NextConfig) => Promise<import("next").NextConfig>} */
  module.exports = async (phase) => {
    /** @type {import("next").NextConfig} */
    const nextConfig = {
        images: {
            remotePatterns: [
                {
                    protocol: 'https',
                    hostname: 'i.imgur.com',
                    port: '',
                    pathname: '/**',
                },
                {
                    protocol: 'https',
                    hostname: 'imgur.com',
                    port: '',
                    pathname: '/**',
                },
            ],
            domains: [
                'res.cloudinary.com',
                'http2.mlstatic.com',
                'fastly.picsum.photos',
                'p3-ofp.static.pub',
                'www.venex.com.ar',
                'i0.wp.com',
                'ar-media.hptiendaenlinea.com',
                'http2.mlstatic.com'
            ],
        },
    };
  
    if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
      const withSerwist = (await import("@serwist/next")).default({
        // Note: This is only an example. If you use Pages Router,
        // use something else that works, such as "service-worker/index.ts".
        swSrc: "/src/app/sw.ts",
        swDest: "public/sw.js",
      });
      return withSerwist(nextConfig);
    }
  
    return nextConfig;
  };

/*
/** @type {import('next').NextConfig} 
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.imgur.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'imgur.com',
                port: '',
                pathname: '/**',
            },
        ],
        domains: [
            'res.cloudinary.com',
            'http2.mlstatic.com',
            'fastly.picsum.photos',
            'p3-ofp.static.pub',
            'www.venex.com.ar',
            'i0.wp.com',
            'ar-media.hptiendaenlinea.com',
            'http2.mlstatic.com'
        ],
    },
};

module.exports = nextConfig;
*/