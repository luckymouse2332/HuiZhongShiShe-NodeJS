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
                    let id = document.getElementById("id");
                    let username = document.getElementById("name");
                    let about = document.getElementById("aboutUser");

                    id.innerHTML = "id" + res.data.id;
                    username.innerHTML = "用户名" + res.data.username;
                    about.innerHTML = "用户介绍" + res.data.about;
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

function plusButton() {

    // 添加元素
    const input = document.createElement('input');

    // 添加按钮
    const button = document.createElement('button');

    // 获取元素
    const form = document.getElementById('form');

    // 设置元素id属性
    input.id = "input";
    button.id = "button";

    form.appendChild(input);
    form.appendChild(button);
}