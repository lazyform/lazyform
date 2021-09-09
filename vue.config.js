'use strict';
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const resolve = (dir) => path.resolve(__dirname, dir);
module.exports = {
    // 修改 src 目录 为 examples 目录
    pages: {
        index: {
            entry: 'examples/main.ts',
            template: 'public/index.html',
            filename: 'index.html',
        },
    },
    css: {extract: false},
    productionSourceMap: false,
};