/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'github.com',
				// port: '',
				// pathname: '/account123/**',
			},
			{
				protocol: 'https',
				hostname: 'replicate.delivery',
			},
			{
				protocol: 'https',
				hostname: 'avatars.githubusercontent.com',
			},
		],
	},
}

export default nextConfig
