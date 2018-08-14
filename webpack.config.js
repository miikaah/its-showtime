const path = require('path');

module.exports = {
	mode: 'development',
	entry: './src/app/main.ts',
	output: {
		filename: 'bundle.js',
		path: path.join(__dirname, 'devdist')
	},
	resolve: {
		extensions: ['.ts'],
		alias: { '@app': path.resolve('./src/app/') }
	},
	module: {
		rules: [{
			test: /\.ts$/,
			use: [{ loader: 'ts-loader' }]
		}]
	}
}
