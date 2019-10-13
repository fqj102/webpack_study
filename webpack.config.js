const path = require('path');

module.exports = {
    entry: './src/index02.js',
    output: {
        filename: 'main2.js',
        path: path.resolve(__dirname, 'dist'),
    }
};
