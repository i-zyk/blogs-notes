const { resolve } = require('path');
const merge = require('webpack-merge');
const argv = require('yargs-parser')(process.argv.slice(2));//解析--mode后面的环境：webpack --mode development
console.log('argv', argv);
const _mode = argv.mode || 'development';
const _mergeConfig = require(`./config/webpack.${_mode}.js`);
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); //有变化自动清理
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const _modeflag = _mode === 'production' ? true : false;
//可以整点进度条样式啥的
//const ProgressBarPlugin = require('progress-bar-wepack-plugin');
//const WebpackBar = require('webpackbar');
const { ThemedProgressPlugin } = require('themed-progress-plugin');

const webpackBaseConfig = {
  entry: {
    main: resolve('src/index.tsx'),
  },
  output: {
    path: resolve(process.cwd(), 'dist'),
  },
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/,
				exclude: /(node_modules)/,
				use: {
					// `.swcrc` can be used to configure swc
					loader: 'swc-loader',
				},
			},
			{
				test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.css$/i,
				use: [
					MiniCssExtractPlugin.loader,
					// 'style-loader',
					{ loader: 'css-loader', options: { importLoaders: 1 } },
					'postcss-loader',
				]
				// use: ['style-loader', 'css-loader'],
			}
		]
	},
	resolve: {
		alias: {
			'@': resolve('src/'),
			'@components': resolve('src/components'),
			'@hooks': resolve('src/hooks'),
			'@pages': resolve('src/pages'),
			'@layouts': resolve('src/layouts'),
			'@assets': resolve('src/assets'),
			'@states': resolve('src/states'),
			'@service': resolve('src/service'),
			'@utils': resolve('src/utils'),
			'@lib': resolve('src/lib'),
			'@constants': resolve('src/constants'),
			'@connections': resolve('src/connections'),
			'@abis': resolve('src/abis'),
			'@types': resolve('src/types'),
		},
		extensions: ['.js', '.ts', '.tsx', '.jsx', '.css'],
		fallback: {
			// stream: require.resolve('stream-browserify'),
		}
	},
	plugins: [
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: _modeflag
				? 'styles/[name].[contenthash:5].css'
				: 'styles/[name].css',
			chunkFilename: _modeflag
				? 'styles/[name].[contenthash:5].css'
				: 'styles/[name].css',
			ignoreOrder: false,
		}),
		new ThemedProgressPlugin(),
	],
};
module.exports = merge.default(webpackBaseConfig, _mergeConfig);