module.exports = {
	plugins: {
		tailwindcss: {},
		autoprefixer: {},
		'postcss-import': {},
		'postcss-preset-env': {
			features: {
				'nesting-rules': true,
			},
		},
	},
};
