/*
 * 导入包
 */

// 导入express模块
const express = require('express');

// 导入路由模块
const userRouter = require('./router/user');

// 导入joi验证模块
const joi = require('joi');

// 导入用于跨域资源共享的模块
const cors = require('cors');

// 文件路径
const path = require('path');
const filePublic = path.join(__dirname, "../public/");

// 导入解析Token的中间件
const expressJWT = require('express-jwt');

// 导入配置文件
const config = require('./config');

// 导入获取用户信息的路由模块
const userinfoRouter = require('./router/userinfo');


// 创建app实例
const app = express();

/*
 * 配置中间件和路由
 */
// 配置解决跨域资源共享问题的中间件
app.use(cors());

// 配置解析表单urlencoded类型数据的中间件
app.use(express.urlencoded({ extended: false }));

// 配置输出中间件
app.use((req, res, next) => {
    res.EasySend = function (err, status = 1) {
        res.send(
            {
                // 状态代码
                status,

                // 判断错误类型
                msg: err instanceof Error ? err.message : err
            }
        );
    }

    next();
});

// 配置解析Token的中间件
app.use(expressJWT.expressjwt(
    {
        secret: config.jwtSecretKey,
        algorithms: ['HS256']
    }
).unless( // 不需要身份验证
    {
        path: [/^\/api\//, "/", "/login.html", "/disclaimer.html", "/index.html", "/members.html", "/news.html", "/thanks.html", "/about.html", "/admin.html", /^\/styles\//, /^\/scripts\//, /^\/images\//]
    }
));

// 托管静态资源的中间件
app.use(express.static(filePublic));

// 配置用户登录的路由
app.use("/api", userRouter);

// 配置获取用户信息的路由
app.use("/user", userinfoRouter);

// 配置错误级别的中间件
app.use((err, req, res, next) => {

    // 数据验证失败
    if (err instanceof joi.ValidationError) {
        return res.send(
            {
                stauts: 1,
                msg: err.message
            }
        );
    }

    // 身份认证错误
    if (err.name == "UnauthorizedError") {
        return res.send(
            {
                status: 1,
                msg: "身份认证失败"
            }
        );
    }

    // 未知错误
    return res.send(
        {
            status: 1,
            msg: err instanceof Error ? err.message : err
        }
    );
});

// 监听8888端口
app.listen(80, () => {
    console.log("server running at http://127.0.0.1"); 76
});
