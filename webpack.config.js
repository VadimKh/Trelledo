'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const DEVELOPMENT = NODE_ENV === 'development';
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const rimraf = require('rimraf');

function addHash(template, hash, onlyDev) {
    return DEVELOPMENT || onlyDev
        ? `${template}?hash=[${hash}]`
        : template.replace(/\.[^.]+$/, `.[${hash}]$&`);
}

module.exports = {
    context: path.join(__dirname, 'source'),
    entry: { main: './main' },
    output: {
        path:       __dirname + '/public/www',
        filename:   addHash('[name].js', 'hash')
    },

    devtool: DEVELOPMENT ? 'cheap-inline-module-source-map' : false,

    module: {
        loaders: [{
            test:   /\.js$/,
            loader: 'babel?presets[]=es2015'
        }, {
            test:   /\.jade$/,
            loader: 'jade'
        }, {
            test:   /\.styl$/,
            loader: DEVELOPMENT
                ? 'style!css!stylus'
                : ExtractTextPlugin.extract('css!stylus?resolve url')
        },
        {
            test:   /\.css/,
            loader: 'style!css'
        },
        {
            test:   /\.(png|jpg|svg|ttf|eot|woff|woff2|mp3|json)$/,
            loader: addHash('file?name=[path][name].[ext]', 'hash:6', true)
        }]
    },

    plugins: [
        new ExtractTextPlugin(addHash('[name].css', 'contenthash'), {allChunks: true}),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common'
        }),
        new HtmlWebpackPlugin({
            title: 'Trelledo',
            template: './source/index.html'
        })
    ],

    devServer: {
        contentBase: path.join(__dirname, 'source'),
        hot: true,
        historyApiFallback: true
    }
};


if (!DEVELOPMENT) {
    module.exports.plugins.unshift(
        {
            apply: (compiler) => {
                rimraf.sync(compiler.options.output.path);
            }
        }
    );
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings:     false,
                drop_console: true,
                unsafe:       true
            }
        })
    );
}
