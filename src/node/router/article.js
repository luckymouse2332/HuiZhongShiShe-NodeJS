/*
 * 导入实现后的路由并发给 app.js
 */

// 导入express
const express = require('express');

// 导入实现函数的模块
const article_Handler = require('../router_handler/article');

// 生成Router
const router = express.Router();

// 投稿
router.post("/add", article_Handler.add);
