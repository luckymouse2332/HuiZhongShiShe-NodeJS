/*
 *  这是数据库的验证模块
 */

// 导入 mysql2 数据库操作模块
const mysql2 = require('mysql2');

// 创建数据库的连接对象
const db = mysql2.createPool(
    {
        host: "127.0.0.1", // 要连接的IP
        user: "", // 这是数据库的用户名
        password: "", // 这是密码
        database: "" // 这是要连接的数据库名
    }
);

module.exports = db;