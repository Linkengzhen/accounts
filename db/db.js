/*
*  @param {*} success 数据库连接成功的回调
*  @param {*} error 数据库连接失败的回调
* */
module.exports = function (success, error) {
    const mongoose = require('mongoose');
    const {DBHOST, DBPORT, DBNAME} = require('../config/config.js');
    mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`);
    mongoose.connection.once('open',()=>{
        success();
    });

    mongoose.connection.on('error',()=>{
        error();
    });
    mongoose.connection.on('close',()=>{
        console.log('连接关闭！');
    });
// setTimeout(() => {
//     mongoose.disconnect();
// }, 2000);
}