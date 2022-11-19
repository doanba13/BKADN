const { merge } = require('webpack-merge');
const { resolve } = require('path');
const { removeDataTestIdTransformer } = require('typescript-transformer-jsx-remove-data-test-id');
const CommonConfig = require('./webpack.common');
const CompressionPlugin = require('compression-webpack-plugin');

// import WebpackAssetsManifest = require('webpack-assets-manifest'

module.exports = merge(CommonConfig, {
    mode: 'production',

    module: {
        rules: [
            // Todo: Configure Babel to use both js and ts

            {
                test: /\.tsx?$/,
                exclude: [/node_modules/],
                loader: 'ts-loader',
                options: {
                    configFile: resolve(__dirname, '..', 'tsconfig.json'),
                    getCustomTransformers: () => ({
                        // Delete the data-test-id for react components
                        before: [removeDataTestIdTransformer()],
                    }),
                },
            },
        ],
    },

    plugins: [
        new CompressionPlugin({
            test: /\.(js|css)(\?.*)?$/i,
            filename: '[path][base].gz',
            algorithm: 'gzip',
            deleteOriginalAssets: false,
        }),
    ],

    performance: {
        hints: 'warning',
        maxAssetSize: 110000,
        maxEntrypointSize: 290000,
    },
});
