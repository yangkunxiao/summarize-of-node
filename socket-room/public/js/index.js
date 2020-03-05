var $input = document.querySelector('#input');
var $content = document.querySelector('.content');
var $sendBtn = document.querySelector('#sendBtn');
var $loginbutton = document.querySelector('#loginbutton');
var $inputName = document.querySelector("#name");
var $chatbox = document.querySelector('#chatbox');
var $loginbox = document.querySelector('#loginbox');

var socket = io.connect("http://127.0.0.1:7777");

var username = '';

var to = '';
//登录 设置昵称
$loginbutton.onclick = function () {
    setUsername();
};

$inputName.onkeyup = function (e) {
    if (e.keyCode === 13) {
        setUsername();
    }
}

// 点击聊天图片 弹窗
$('#chatbox').delegate('.section img', 'click', function () {
    var imgSrc = $(this).attr('src');
    $("#picImg").attr('src', imgSrc);
    $("#showmodal2").click();
});

function setUsername() {
    username = $inputName.value.replace(/(^\s*)|(\s*$)/g, "");
    if (!username) {
        alert('请输入用户名');
        return;
    }
    socket.emit('login', { username: username });
}
//登录失败
socket.on("usernameErr", data => {
    alert(data.err)
});

//登录成功
socket.on("loginSuccess", data => {
    console.log(data);
    // 如果服务器返回的用户名和我们登录的用户名相同的话，那就登录
    if (username === data.username) {
        beginChat(data);
    } else {
        comAndLeave(1, data);
    }
})

function beginChat(data) {
    console.log(data)
    $chatbox.style.display = 'block';
    $loginbox.style.display = 'none';
    var str = username + '进入聊天室';
    $content.innerHTML += '<div class="list">\
                            <div class="info">'+ str + '</div>\
                          </div>';
    // 渲染在线成员
    renderOnlinePeople(data);
}

$input.onkeyup = function (e) {
    if (e.keyCode === 13) {
        sendMsg()
    }
}
// 监听发送按钮事件
$sendBtn.onclick = sendMsg;

// 点击发送图片
$('#imgbutton').on('click', function (e) {
    e.preventDefault();
    $('#imginput').click();
});
$('#imginput').change(function (event) {
    sendImg(event);
    //重置一下form元素，否则如果发同一张图片不会触发change事件
    $("#resetform")[0].reset();
});


// 监听用户离开聊天室
socket.on('oneLeave', (data) => {
    comAndLeave(-1, data);
});

//监听消息
socket.on("server message", data => {
    var username = data.username;
    renderOnlinePeople(data);
    $content.innerHTML += '<div class="list">\
                            <p class="user-name">'+ username + '</p>\
                            <div class="section">'+ data.text + '</div>\
                          </div>';
});

// 接收私聊消息
socket.on('receiveToOne', (data) => {
    var text = '来自' + data.username;
    $("#myModalLabel1").text(text);
    $(".shoudao").text(data.text);
    $("#showmodal").click();
});

//接受图片
socket.on('receiveImg', data => {
    // 显示图片 
    showImg(data);
})

//监听成员点击事件
$('#list-group').on('click', function (event) {
    initModal(event);
});

// 发送私聊信息
$('#sendtoo').on('click', function (e) {
    let text = $("#inputtoone").val();
    if (text) {
        socket.emit('sendToOne', { text: text, to: to, username: username });
        $("#inputtoone").val('');
        $("#closesendtoo").click();
    } else {
        alert('请输入内容');
    }
});

//渲染在线成员
function renderOnlinePeople(data) {

    var ihtml = '<li data-nickname="' + username + '" class="user-self-disabled">\
                  <div class="icon"></div>\
                  <div class="nickname user-self">'+ username + '</div>\
                </li>';
    $('#list-group').html(ihtml);
    var dhtml = '';
    // 添加别人
    for (let user of data.userGroup) {
        if (username && (user.username !== username)) {
            dhtml += '<li data-nickname="' + user.username + '" data-toggle="modal" data-target="#myModal" class="other-people">\
                    <div class="icon"></div>\
                    <div class="nickname" data-name="'+ user.username + '">' + user.username + '</div>\
                  </li>';
        }
    }
    $('#list-group').append(dhtml);
}

function strEscape(str) {
    var div = document.createElement('div');
    if (div.innerText) {
        div.innerText = str;
    } else {
        div.textContent = str;
    }
    return div.innerHTML;
}
//发送图片
function sendImg(e) {
    if (typeof FileReader === 'undefined') {
        alert("您的浏览器不支持该功能");
        return
    }
    let file = e.target.files[0];
    // 使用FileReader读取文件
    let fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    //读取完成之后 自动触发
    fileReader.onload = function (e) {
        console.log(this.result)
        socket.emit('sendImg', { username: username, imgUrl: this.result });
    }
}

//发送消息
function sendMsg() {
    var msg = strEscape($input.value);
    if (!msg) {
        return;
    }
    // socket发送消息
    socket.emit('client message', {
        text: msg,
        time: new Date(),
        username: username
    }, () => {
        console.log('发送成功');
    });

    // 消息显示到页面上
    $content.innerHTML += '<div class="list">\
                                <div class="user-name oneself">'+ username + '</div>\
                                <div class="section section-self">'+ msg + '</div>\
                              </div>';
    // input的值 清空
    $input.value = '';
}

// 显示图片
function showImg(data) {
    var str = '';
    // 判断这个消息是不是自己发的，然后显示不同的样式
    if (data.username === username) {
        str = '<div class="list">\
              <div class="user-name oneself">'+ data.username + '</div>\
              <div class="section section-self">\
                <img src="'+ data.imgUrl + '" style="max-height: 100px"/>\
              </div>\
            </div>';
        $('.content').append(str);
    } else {
        str = '<div class="list">\
              <p class="user-name">'+ data.username + '</p>\
              <div class="section">\
                <img src="'+ data.imgUrl + '" style="max-height: 100px"/>\
              </div>\
             </div>';
        $('.content').append(str);
    }
}

/**
 * @param flag 为1代表好友上线，-1代表好友下线
 * @param data 存储用户信息
 */
function comAndLeave(flag, data) {
    if (flag === 1) {
        var dhtml = '<li data-nickname="' + data.username + '" data-toggle="modal" data-target="#myModal" class="other-people">\
                    <div class="icon"></div>\
                    <div class="nickname" data-name="'+ data.username + '">' + data.username + '</div>\
                  </li>';
        $('#list-group').append(dhtml);
    } else if (flag === -1) {
        if (data.username) {
            var str = data.username + '离开聊天室';
            $content.innerHTML += '<div class="list">\
                                <div class="info">'+ str + '</div>\
                              </div>';
            // 找到该用户 并且删除掉
            $('#list-group').find($(`li[data-nickname='${data.username}']`)).remove();
        }
    }
}

function initModal(e) {
    to = $(e.target).attr('data-name');
    var str1 = '发给' + to;
    $("#myModalLabel").text(str1);
}


