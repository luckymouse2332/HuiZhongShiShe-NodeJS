const isCookie = false;
// 监听按钮事件，按下后发起POST请求
$(() => {
    $('.button').click(() => {
        console.log("发起请求.....");
        $.ajax(
            {
                url: "/api/login",
                type: "post",
                dataType: "json",
                data: {
                    username: document.getElementById("name").value,
                    password: document.getElementById("passwd").value
                },
                success: (res) => {
                    if (res.status == 0) {
                        // 设置cookie
                        localStorage.token = res.token;
                        // 发送信息
                        window.alert("登陆成功！");
                        location.href="index.html";
                    }
                    else {
                        // 判断错误类型
                        if (res.msg == "没有这个用户！" || res.msg == "密码错误！") {
                            window.alert(res.msg);
                        }
                        else {
                            window.alert("登录失败，请重新登录");
                        }
                    }
                },
            }
        )
    })
})