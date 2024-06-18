const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
var glob = require("glob");

function getTypeScriptEntryPoints() {
    var entry = glob.sync("./src/code/*.{ts,js}", { "ignore": ['./src/code/common.ts'] }).reduce((filelist, filepath) => {
        filelist[path.parse(filepath).name] = filepath;
        return filelist;
    }, {});
    console.log(entry);
    return entry;
}

module.exports = {
    devtool: 'source-map',
    entry: getTypeScriptEntryPoints(),
    output: {
        filename: '[name].js',
        sourceMapFilename: 'maps/[name].js.map',
        path: path.resolve(__dirname, './abc_/scripts'),
        library: ['abc', '[name]'],
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
        new CleanWebpackPlugin()
    ],
    resolve: {
        extensions: ['.ts', '.js'],
    }
};


