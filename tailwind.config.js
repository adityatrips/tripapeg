/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				text: '#0f0920',
				background: '#f3f1fb',
				primary: '#6345ca',
				secondary: '#d690df',
				accent: '#d364bd',
			},
		},
	},
	plugins: [],
};
