const path = require('path');

module.exports = {
    entry: {
        web: ['./web/index.js'],
        editor: ['./editor/index.js']
    },

    output: {
        path: path.resolve(__dirname, 'public/dist'),
        filename: 'bundle_[name].js',
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader'}
                ],
            },
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015', 'react']
                        }
                    },
                ]
            },

        ],
    },

    devServer: {
        contentBase: '.', //网站的根目录为 根目录/dist，如果配置不对，会报Cannot GET /错误
        port: 9000, //端口改为9000
        historyApiFallback:{
            index: 'views/index.html'
        }
    }
};