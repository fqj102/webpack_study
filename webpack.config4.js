const path = require('path');

module.exports = {
    entry:'./src/index04.js',//入口
    output:{
        filename: "main4.js",
        path:path.resolve('./dist')   //必须是绝对路径
    }, //出口
    devServer: {  //开发服务器
        contentBase:'./dist',
        port:3000,
        compress:true //服务器
    },
    module:{//模块
    },
    plugins:[], //插件
    mode:'development', //开发模式
    resolve:{}, //配置解析
};
