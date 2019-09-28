const path = require('path'); // node.js의 모듈로서 파일 경로를 다룸.
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
module.exports = {
    // https://webpack.js.org/concepts/mode/
    mode: 'development',

    // 시작 스크립트 파일
    entry: path.resolve(__dirname, 'src/index.js'), // './src/index.js'와 같다.

    resolve: {
        // 프로젝트의 루트디렉토리를 설정하여, 나중에 ./components 혹은 ../components 이렇게 접근해야 되는 디렉토리를 바로 components 로 접근 할 수 있게 해줍니다.
        modules: [
            path.resolve(__dirname, 'src'),
            'node_modules'
        ]
    },

    devtool: 'inline-source-map',

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
            { // css
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' }
                ],
            },
            { // scss
                test: /\.(sass|scss)$/,
                use: [
                    'style-loader', // creates style nodes from JS strings
                    'css-loader', // translates CSS into CommonJS
                    'sass-loader' // compiles Sass to CSS, using Node Sass by default
                ],
            },
            { // file
                test: /\.(gif|jpg|png|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {},
                    },
                ],
            },
            { // url
                test: /\.(ttf|woff|woff2|eot)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
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

    plugins: [
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            Mustache: 'mustache',
        }),
        new HtmlWebpackPlugin({
            title: 'Development', // 아래 template 없을 때 빈 html에 title 제공.
            inject: true,
            template: path.resolve(__dirname, 'public/index.html'), // 없으면 빈 html을 만들어 생성됨.
        })
    ],

    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js'
    }
};

