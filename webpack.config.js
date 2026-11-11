import webp from 'webpack';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import TerserPlugin from 'terser-webpack-plugin';

const __dirname = import.meta.dirname ?? path.dirname(fileURLToPath(import.meta.url));

export default webp.defineConfig({
    mode: 'production',
    entry: path.join(__dirname, 'src/main.js'),
    output: {
        path: path.join(__dirname, 'dist/'),
        filename: 'main.bundled.js',
    },
    resolve: {
        extensions: ['.js'],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-env',
                    ],
                },
            },
        ],
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                extractComments: false,
                terserOptions: {
                    mangle: {
                        toplevel: true,
                    },
                    format: {
                        comments: false,
                    },
                },
            }),
        ],
    },
});
