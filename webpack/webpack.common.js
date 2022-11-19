const { resolve } = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizer = require('css-minimizer-webpack-plugin');
const MiniCssExtract = require('mini-css-extract-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin');
require('dotenv').config();
const DotEnv = require('dotenv-webpack');

module.exports = {
    entry: '/src/index.tsx',
    output: {
        path: resolve(__dirname, '..', 'build'),
        filename: 'static/js/[name].[fullhash].js',
        chunkFilename: 'static/js/chunk.[name].[fullhash].js',
        clean: true,
        publicPath: '/',
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
            '@': resolve(__dirname, '..', 'src'),
        },
        //modules: [join(__dirname, '..', 'node_modules')],
    },

    plugins: [
        new SimpleProgressWebpackPlugin({
            format: 'compact', // Change to 'verbose' to display more information
        }),

        new DotEnv(),

        new NodePolyfillPlugin(),

        new MiniCssExtract({
            filename: 'static/css/[name].[fullhash].css',
            ignoreOrder: false,
        }),

        new HtmlPlugin({
            scriptLoading: 'module',
            template: '/public/index.html',
            title: process.env.APP_TITLE,
            minify: true,
        }),

        new ESLintPlugin({
            extensions: ['js', 'mjs', 'jsx', 'ts', 'tsx'],
            eslintPath: require.resolve('eslint'),
        }),

        new CopyPlugin({
            patterns: [
                {
                    from: 'public/assets',
                },
            ],
        }),
    ],

    module: {
        rules: [
            // Todo: Add sass loader
            {
                test: /.css$/,
                use: [
                    { loader: MiniCssExtract.loader },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: false,
                            sourceMap: false,
                        },
                    },
                ],
                // Todo: Find way to include/exclude css in node_modules with 'exclude'
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'static/assets/img/[name].[ext]',
                        },
                    },
                ],
            },
            {
                test: /\.(woff(2)?|eot|tff|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'static/assets/fonts/[name].[ext]',
                        },
                    },
                ],
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: '@svgr/webpack',
                        options: {
                            name: 'static/assets/img/[name].svg',
                        },
                    },
                ],
            },
        ],
    },

    optimization: {
        portableRecords: true,
        chunkIds: 'named',
        moduleIds: 'named',
        mangleExports: 'size',

        minimize: true,
        minimizer: [
            new TerserPlugin({
                exclude: [/node_modules/],
                parallel: true,
                minify: TerserPlugin.uglifyJsMinify,
                terserOptions: {
                    compress: true,
                },
            }),
            new CssMinimizer({
                exclude: [/node_modules/],
                minimizerOptions: {
                    preset: [
                        'default',
                        {
                            discardComments: { removeAll: true },
                        },
                    ],
                },
                minify: CssMinimizer.cleanCssMinify,
            }),
        ],

        splitChunks: {
            chunks: 'all',
            maxAsyncRequests: 30,
            minSize: 10000,
            maxSize: 124000,

            cacheGroups: {
                // Specific configuration for react optimization size
                reactVendor: {
                    test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom)[\\/]/,
                    name: 'vendor-react',
                    chunks: 'all',
                    maxSize: 140000,
                },
            },
        },
    },

    stats: {
        errorDetails: true,
    },
};
