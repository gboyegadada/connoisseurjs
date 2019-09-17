const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: './app/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js',
        publicPath: '/'
    }, 
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.scss']
    },
    module: {
        rules: [
            { test: /\.ts(x?)$/, exclude: /node_modules/, use: 'ts-loader' },
            { test: /\.(js)$/, use: 'babel-loader' },
            {
              test: /\.s[ac]ss$/i,
              exclude: /node_modules/,
              use: [
                // Creates `style` nodes from JS strings
                'style-loader',
                // Translates CSS into CommonJS
                'css-loader',
                // Compiles Sass to CSS
                'sass-loader',
              ],
            },
            
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' }
        ]
    },
    devtool: "source-map",

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    // externals: {
    //     "react": "React",
    //     "react-dom": "ReactDOM"
    // },
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    devServer: {
        host: '0.0.0.0',
        hot: true,
        historyApiFallback: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'app/index.html'
        }),
        new CopyPlugin([
            { from: '_redirects' }
        ])
    ]
}