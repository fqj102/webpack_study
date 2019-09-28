const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


module.exports = {
    // https://webpack.js.org/concepts/mode/
    mode: 'production',

    entry: path.resolve(__dirname, 'src/index.js'), // './src/index.js'와 같다.

    resolve: {
        // 프로젝트의 루트디렉토리를 설정하여, 나중에 ./components 혹은 ../components 이렇게 접근해야 되는 디렉토리를 바로 components 로 접근 할 수 있게 해줍니다.
        modules: [
            path.resolve(__dirname, 'src'),
            'node_modules'
        ]
    },
    module: {
        rules: [
            { // babel
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-proposal-class-properties'],
                    }
                }
            },
            { // css, scss
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ]
            },
            { // file
                test: /\.(gif|jpg|png|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: './img/[name].[ext]'
                        }
                    }
                ]
            },
            { // url
                test: /\.(ttf|woff|woff2|eot)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: './img/[name].[ext]'
                        }
                    }
                ]
            },
            { // eslint
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    // eslint options (if necessary)
                }
            },
        ],
    },

    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },

    plugins: [
        //new ExtractTextPlugin('styles.css'),

        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            // filename: 'css/[name].[hash].css',
            filename: 'css/[name].css',
            chunkFilename: 'css/[id].[hash].css',
        }),

        new HtmlWebpackPlugin({
            inject: true,
            template: path.resolve(__dirname, 'public/index.html'), // 사용할 html
            filename: path.resolve(__dirname, 'build/index.html'), // 만들어질 html
            minify: { // 생성되는 html을 압축해줌
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            },
        })
    ],

    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    }
};

