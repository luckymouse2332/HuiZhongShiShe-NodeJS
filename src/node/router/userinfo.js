/*
 *  这里向app.js暴露了有关获取用户信息的路由
 */

// 导入express
const express = require('express');
// 创建路由
const router = express.Router();

// 导入验证表单的中间件
const expressJoi = require('@escook/express-joi');

// 导入规则验证对象
const { update_password_schema } = require('../schema/user');

// 导入实现路由的模块
const userinfo_Handler = require('../router_handler/userinfo');

// 生成“关于”界面
router.get("/getinfo", userinfo_Handler.getInfoPage);

// 修改密码
router.post("/updatepwd", expressJoi(update_password_schema), userinfo_Handler.updatePwd);

module.exports = router;