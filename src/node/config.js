/*
 * 这是关于生成JWT字符串的配置文件
 */

module.exports = {
    // Jwt 密钥
    jwtSecretKey: "", // 这是密钥

    // 有效期
    expiresIn: {
        expiresIn: "10h"
    }
}