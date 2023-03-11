/*
 * 导入实现后的路由并发给 app.js
 */

// 导入express
const express = require('express');

// 导入实现函数的模块
const user_Handler = require('../router_handler/user');

// 生成Router
const router = express.Router();

// 登录的接口
router.post("/login", user_Handler.userLogin);

module.exports = router;