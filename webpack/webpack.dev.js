const { resolve } = require('path');
const { merge } = require('webpack-merge');
const CommonConfig = require('./webpack.common');
require('webpack-dev-server');
require('dotenv').config();

const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ReactRefreshTypeScript = require('react-refresh-typescript');

module.exports = merge(CommonConfig, {
    mode: 'development',
    devtool: 'inline-source-map', // it has a greater size but is for dev

    devServer: {
        port: process.env.PORT, // Dev-server's port
        proxy: {
            // Change all endpoint start with "/tv-75-service" to "http://216.48.176.202/tv75-service",
            // similar to "proxy" property in "package.json" in old CRA project
            [process.env.END_POINT_PREFIX]: process.env.PROXY,
        },

        static: {
            // Tell Webpack where to serve static files
            directory: resolve(__dirname, '..', 'build'),
            publicPath: '/',
        },

        historyApiFallback: true, // Allows fallback to errors page when API response is 404
        open: true, // Auto open browser when start dev-server
        compress: true,
        hot: true, // Enable hot modules replacement

        client: {
            logging: 'none',
            reconnect: 15, // Reconnect after 15s idle
            progress: false,
            // Display an iFrame over entire application to display errors
            overlay: {
                errors: true,
                warnings: false,
            },
        },
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: [/node_modules/],
                loader: 'ts-loader',
                options: {
                    configFile: resolve(__dirname, '..', 'tsconfig.json'),
                    getCustomTransformers: () => ({
                        before: [ReactRefreshTypeScript()],
                    }),
                    transpileOnly: true,
                },
            },
        ],
    },
    plugins: [new ReactRefreshWebpackPlugin()],

    cache: {
        type: 'filesystem',
        version: '1.0.0',
        maxAge: 300000,
        hashAlgorithm: 'md4',
        compression: 'gzip',
        cacheLocation: resolve(__dirname, 'cache'),
    },
});
