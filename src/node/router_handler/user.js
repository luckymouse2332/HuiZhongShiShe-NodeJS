/*
 * 这里实现路由处理函数
 */

// 导入数据库的操作模块
const db = require("../db/index");

// 导入密码加密与解密的模块
const bcrypt = require('bcryptjs');

// 导入发送JWT字符串的模块
const jwt = require('jsonwebtoken');

// 导入配置文件
const config = require('../config');

// 导入SQL语句模块
const sql = require("../db/sql");

// 登录
exports.userLogin = (req, res) => {

    db.query(sql.selectUserInfoByName, [req.body.username], (err, results) => {
        // 执行SQL语句错误
        if (err) {
            return res.EasySend(err);
        }

        // 执行完成，但没有找到用户
        if (results.length == 0) {
            return res.EasySend("没有这个用户！");
        }

        
        // 判断密码是否一致
        const compareResult = bcrypt.compareSync(req.body.password, results[0].password);

        if (!compareResult) {
            return res.EasySend("密码错误！");
        }

        // 生成并发送JWT字符串
        // 先剔除不能生成的隐私信息
        const user = {
            ...results[0],
            password: '',
        };

        // 生成Token
        const TokenStr = jwt.sign(user, config.jwtSecretKey, config.expiresIn);

        return res.send(
            {
                status: 0,
                msg: "登录成功！",
                token: "Bearer " + TokenStr
            }
        );
    });
}