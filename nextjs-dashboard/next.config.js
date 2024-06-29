/** @type {import('next').NextConfig} */
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