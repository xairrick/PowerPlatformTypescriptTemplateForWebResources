const publisher = 'abc';
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin');
var glob = require("glob");

function getTypeScriptEntryPoints() {
    var entry = glob.sync("./src/code/*.{ts,js}", { "ignore": ['./src/code/common.ts'] }).reduce((filelist, filepath) => {
        filelist[path.parse(filepath).name] = filepath;
        return filelist;
    }, {});
    console.log(entry);
    return entry;
}

module.exports = 
    {
        name: 'code',
        devtool: 'source-map',
        entry: getTypeScriptEntryPoints(),
        output: {
            filename: '[name].js',
            sourceMapFilename: 'maps/[name].js.map',
            path: path.resolve(__dirname, `./${publisher}_/scripts`),
            library: [publisher, '[name]'],
            libraryTarget: 'var'
        },
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
            ],
        },
        plugins: [
            new CleanWebpackPlugin(),
            new CopyPlugin({
                patterns: [{from: "src/assets", to: `${publisher}_/../assets` }],
              }),
        ],
        resolve: {
            extensions: ['.ts', '.js'],
        }
    };


