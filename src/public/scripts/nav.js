
// 定义要修改的字符串
const navStr = "\n\
<h1 class=\"header1\">欢迎来到回中诗社！</h1>\n\
<nav>\n\
    <ul class=\"links-list\">\n\
        <li><a href=\"thanks.html\">鸣谢名单</a></li>\n\
        <li><a href=\"index.html\">诗社主页</a></li>\n\
        <li><a href=\"members.html\">诗社成员</a></li>\n\
        <li><a href=\"login.html\" id=\"login\">登录</a></li>\n\
        <li><a href=\"news.html\">更新记录</a></li>\n\
        <div id=\"right class=\"right\">\n\
            <a id=\"about\" href=\"about.html\">关于你</a>\n\
        </div>\n\
    </ul>\n\
</nav>";

// 获取到标签
let header = document.getElementById("header");

// 修改标签内部
header.innerHTML = navStr;