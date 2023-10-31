const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const mode = process.env.NODE_ENV || 'development';

module.exports = {
    mode,
    // devtool: 'inline-source-map',
    entry: './src/index.tsx',
    devServer: {
        port: 3000,
        historyApiFallback: true,
        hot: true,
        allowedHosts: 'all',
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|eot|ttf|woff|woff2)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.svg$/,
                use: 'svg-url-loader',
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        // alias: {
        //   Assets: path.resolve(__dirname, "src/assets/"),
        //   Images: path.resolve(__dirname, "src/assets/images/"),
        // },
    },
    output: {
        publicPath: '/',
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'build'),
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            hash: true,
            filename: '../build/index.html',
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'public',
                },
            ],
        }),
    ],
};
