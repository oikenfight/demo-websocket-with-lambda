// output.pathに絶対パスを指定する必要があるため、pathモジュールを読み込んでおく
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')


module.exports = [
    {
        context: path.join(__dirname, './src/js'),
        entry: `./app.js`,
        output: {
            path: path.join(__dirname, 'public/js'),
            filename: 'main.js',
        },
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                }
            ]
        },
        resolve: {
            // import './foo.vue' の代わりに import './foo' と書けるようになる(拡張子省略)
            extensions: ['.js', '.vue'],
            // alias: {
            //     // vue-template-compilerに読ませてコンパイルするために必要
            //     vue$: 'vue/dist/vue.esm.js',
            // },
        },
        plugins: [
            new VueLoaderPlugin()
        ]
    },
    {
        context: path.join(__dirname, './src/sass'),
        entry: {
            style: "./app.scss",
        },
        output: {
            path: path.join(__dirname, './public/css'),
            filename: 'main.css'
        },
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: ['css-loader', 'sass-loader']
                    })
                }
            ]
        },
        plugins: [
            new ExtractTextPlugin('main.css')
        ]
    }
];
