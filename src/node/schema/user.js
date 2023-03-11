/*
 * 此文件用于定义用户名和密码的验证规则
 */

// 导入用于定义规则的模块
const joi = require('joi');

// 定义用户名和密码的验证规则
const password = joi.string().pattern(/^[\S]{6,16}$/).required();

// 定义验证注册和登录表单数据的规则对象
// 定义验证重置密码表单数据的规则对象
exports.update_password_schema = {
    body: {
        oldPwd: password,

        // 使用joi.not(joi.ref('oldPwd')).conncat(password) 规则，验证 req.body.newPwd 的值
        // joi.ref 表示 xx必须与xx相等 而加上了joi.not之后就表示必须不相等
        // connat用于合并规则

        newPwd: joi.not(joi.ref("oldPwd")).concat(password)
    }
}