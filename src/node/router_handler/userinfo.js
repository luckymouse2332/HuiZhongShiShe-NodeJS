/*
 * 这里实现了用户相关的路由
 */

// 导入数据库验证模块
const db = require("../db/index");

// 导入加密解密模块
const bcrypt = require('bcryptjs');

// 导入所有的SQL语句
const sql = require("../db/sql");

// “关于”界面的数据
exports.getInfoPage = (req, res) => {
    // 执行SQL
    db.query(sql.selectUserInfoById, [req.auth.id], (err, results) => {
        // 执行SQL语句失败
        if (err) {
            return res.EasySend(err);
        }

        // 执行成功，但长度不是一
        if (results.length != 1) {
            return res.EasySend("出错啦，请稍后再试！");
        }

        res.send(
            {
                status: 0,
                msg: "获取成功！",
                data: {
                    id: req.auth.id,
                    username: results[0].username,
                    about: results[0].email
                }
            }
        );
    });
}

// 重置密码
exports.updatePwd = (req, res) => {
    const password = bcrypt.hashSync(req.body.newPwd, 10);
    // 执行SQL
    db.query(sql.selectUserInfoById, [req.auth.id], (err, results) => {
        // 执行SQL语句失败
        if (err) {
            return res.EasySend(err);
        }

        // 执行成功，但影响的行数不是1
        if (results.length != 1) {
            return res.EasySend("出错啦，请稍后再试！");
        }

        // 比较密码
        const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password);

        if (!compareResult) {
            return res.EasySend("密码错误！");
        }

        db.query(sql.updatePwd, [password, req.auth.id], (err, results) => {
            // 执行SQL语句失败
            if (err) {
                return res.EasySend(err);
            }

            // 执行成功，但影响的行数不是1
            if (results.affectedRows != 1) {
                return res.EasySend("密码更新失败！");
            }

            // 执行成功
            return res.EasySend("更新成功！", 0);
        });
    })
}