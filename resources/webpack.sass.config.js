let autoprefixer = require('autoprefixer'),
    cssnano = require('cssnano'),
    glob = require('glob'),
    path = require('path'),
    public = {
        css: path.resolve(__dirname, '../public/css')
    };

let { CleanWebpackPlugin } = require('clean-webpack-plugin'),
    CssMinimizerPlugin = require('css-minimizer-webpack-plugin'),
    MiniCssExtractPlugin = require('mini-css-extract-plugin');


function scss(bundle, scss = {}) {
    return [
        scss.prepend || [],
        glob.sync(`./{vendor/components,components,pages,vendor/utilities}/**/${bundle}`, { nosort: true }),
        scss.append  || []
    ].flat();
}


module.exports = {
    entry: {
        'app': scss('!([_]|variables).scss', { prepend: ['modern-normalize/modern-normalize.css'] }),
        'themes/default': scss('variables.scss')
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.(c|sc|sa)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            // Prevents Following Urls To Fonts/Images
                            url: false,
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [autoprefixer(), cssnano()]
                            }
                        }
                    },
                    { loader: 'sass-loader' },
                ],
            },
        ],
    },
    optimization: {
        minimize: true,
        minimizer: [new CssMinimizerPlugin()]
    },
    output: {
        path: public.css
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
        new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns: [`${public.css}/**/*.*`, `!${public.css}/**/*.css`],
            cleanOnceBeforeBuildPatterns: [],
            dangerouslyAllowCleanPatternsOutsideProject: true,
            dry: false,
            verbose: false
        })
    ]
}
