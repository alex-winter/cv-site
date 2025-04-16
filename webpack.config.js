const path = require('path');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

module.exports = {

    mode: 'development',

    entry: './client/index.ts',
    
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ],
    },
    
    resolve: {
        extensions: ['.ts', '.js', '.css', '.scss'],
    },
    
    output: {
        filename: 'bundle.[contenthash].js',
        chunkFilename: 'bundle.[chunkhash].js',
        path: path.resolve(__dirname, 'public', 'dist'),
        clean: true,
    },
    
    devtool: 'source-map',
    
    plugins: [
        new WebpackManifestPlugin({
            fileName: 'manifest.json',
            publicPath: '/dist/',
        }),
    ],
};
