/*
 *  这是SQL语句模块
 */

// 创建SQL语句对象
const sql = {
    selectUserInfoByName: "SELECT * FROM users WHERE username=?",
    selectUserInfoById: "SELECT * FROM users WHERE id=?",
    updatePwd: "UPDATE users SET password=? WHERE id=?"
}

module.exports = sql;