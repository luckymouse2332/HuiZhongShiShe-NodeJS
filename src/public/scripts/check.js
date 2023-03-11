
$(() => {
    // 页面加载完成后，自动发起请求，获取用户姓名
    $.ajax(
        {
            type: "GET",
            url: "/user/getnameinfo",
            contentType: "application/x-www-form-urlencoded",
            beforeSend: (request) => {
                // 设置HTTP请求头部为token
                request.setRequestHeader("Authorization", localStorage.token);
            },
            success: (res) => {
                // 请求成功，状态码为一
                if (res.status == 0) {
                    console.log("欢迎！" + res.username);
                } 
                // 请求成功，状态码不为一
                else {
                    // 删除关于链接
                    const right = document.getElementById("about");
                    right.remove();
                    // 提示信息
                    console.log("你还没登陆");
                }
            }
        }
    )

    // 为超链接绑定click事件
    $("#about").on("click", () => {
        $.ajax(
            {
                type: "GET",
                url: "/user/getinfo/",
                beforeSend: (request) => {
                    // 设置HTTP请求头部为token
                    request.setRequestHeader("Authorization",localStorage.token);
                },
                success: (res) => {
                    location.href = "./about.html";
                }
            }
        );
    });
})
