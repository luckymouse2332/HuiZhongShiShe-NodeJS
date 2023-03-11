$(() => {
    // 页面加载完成后，自动发起请求，获取用户信息
    $.ajax(
        {
            type: "GET",
            url: "/user/getinfo",
            contentType: "application/x-www-form-urlencoded",
            beforeSend: (request) => {
                // 设置HTTP请求头部为token
                request.setRequestHeader("Authorization", localStorage.token);
            },
            success: (res) => {
                // 请求成功，状态码为一
                if (res.status == 0) {
                    if (res.data.username == "admin") {
                        location.href = "./admin.html";
                    }
                    else {

                        let id = document.getElementById("id");
                        let username = document.getElementById("name");
                        let about = document.getElementById("about");

                        id.innerHTML = "你的id是：" + res.data.id;
                        username.innerHTML = "你的用户名是：" + res.data.username;
                        about.innerHTML = "关于你：" + res.data.about;
                    }
                }
                // 请求成功，状态码不为一
                else {
                    window.alert("发生错误！" + res.msg);
                    location.href = "index.html";
                }
            }
        }
    )

    $(".button").click(() => {
        console.log("发起请求.....");
        $.ajax(
            {
                url: "/user/updatepwd",
                type: "post",
                dataType: "json",
                // 获取表单提交的数据
                data: {
                    oldPwd: document.getElementById("oldPwd").value,
                    newPwd: document.getElementById("newPwd").value
                },
                beforeSend: (request) => {
                    // 设置HTTP请求头部为token
                    request.setRequestHeader("Authorization", localStorage.token);
                },
                // 请求成功
                success: (res) => {
                    if (res.status == 0) {
                        window.alert("重置成功！请重新登录");
                        location.href = "./login.html";
                    }
                    else {
                        // 判断错误类型
                        if (res.msg == "原密码错误！") {
                            window.alert(res.msg);
                        }
                        else {
                            window.alert("重置失败！" + res.msg);
                        }
                    }
                },
            }
        )
    })
})