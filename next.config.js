/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: [
			'lh3.googleusercontent.com',
			'firebasestorage.googleapis.com',
			'images.unsplash.com',
		],
	},
};

module.exports = nextConfig;
