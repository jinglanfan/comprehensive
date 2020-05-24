"use strict";
const express = require('express'); // 引入express模块
const app = express(); // 调用方法生成应用

const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded()); //json方式发送参数
app.use(bodyParser.json());

//management
var USERS = [{
        id: '01',
        userName: '张三',
        number: '56'
    },
    {
        id: '02',
        userName: "李四",
        number: '89'
    },
    {
        id: '03',
        userName: "王二",
        number: '100'
    },
    {
        id: '04',
        userName: "李明",
        number: '59'
    },
    {
        id: '05',
        userName: "张强",
        number: '67'
    },
    {
        id: '06',
        userName: "丁勇",
        number: '88'
    }
];


//login
var USLG = [{
        userName: 'admin',
        password: '12344321'
    },
    {
        userName: 'asdfg',
        password: '12345678'
    },
    {
        userName: 'aqwer3',
        password: '33333333'
    },
    {
        userName: 'azxcv4',
        password: '44444444'
    },
    {
        userName: 'azxsw5',
        password: '55555555'
    },
    {
        userName: 'aqwsx6',
        password: '66666666'
    }
];


//跨域处理
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization,Accept, X - Requested - With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    if (req.method == "OPTIONS") res.send(200);
    else next();
});


// 响应GET方法
// URL（也叫作路由）
// 回调函数，表示收到请求后，如何处理并应答
app.get('/hello', function (req, resp) {
    resp.send('哈哈哈');
    resp.end();
});

// 显示所有management信息
app.get('/users', function (req, resp) {
    resp.send(USERS);
    resp.end();
});

//显示所有userslogin信息
app.get('/usslg', function (req, resp) {
    resp.send(USLG);
    resp.end();
});


//查找userslogin用户名
app.get('/usslg/:userName', function (req, resp) {
    const userName = req.params.userName;
    for (let usslg of USLG) {
        if (usslg.userName === userName) {
            resp.send([usslg]);


            break;
        }
    }
    resp.end();
});

app.get('/usslg/:password', function (req, resp) {
    const password = req.params.password;
    for (let usslg of USLG) {
        if (usslg.password === password) {
            resp.send([usslg]);


            break;
        }
    }
    resp.end();
});


app.get('/usslg', function (req, resp) {
    resp.send(USLG);
    resp.end();
});


//查找userslogin
app.post('/usslg', function (req, resp) {
    console.log("查找服务启动");

    let succ = false;
    // const userName = req.params.userName;
    console.log(req.body.password, req.body.userName)
    for (let usslg of USLG) {

        if (usslg.password == req.body.password && usslg.userName == req.body.userName) {
            succ = true;
            console.log([succ]);
            resp.send(succ);
            break;
        }
    }
    resp.end();
});


//查找management信息
app.get('/users/:id', function (req, resp) {
    console.log(req.params);
    const id = req.params.id;
    for (let user of USERS) {
        if (user.id === id) {
            resp.send([user]);
            break;
        }
    }
    resp.end();
});

// 添加management用户
// app.post('/user/:id/:userName/:password', function (req, resp) { //参数化路由发送参数
app.post('/user', function (req, resp) {

    //json
    // console.log(req.params);
    // console.log(req.body);
    USERS.push(req.body);
    resp.send({
        succ: true
    });
    resp.end();
});




app.post('/uslg', function (req, resp) {

    //json
    // console.log(req.params);
    // console.log(req.body);
    USLG.push(req.body);
    resp.send({
        succ: true
    });
    resp.end();
});




// 修改用户
app.put('/user', function (req, resp) {
    //json
    let founded = false;
    for (let user of USERS) {
        if (user.id === req.body.id) {
            user.userName = req.body.userName;
            user.number = req.body.number;
            founded = true;
            break;
        }
    }

    if (founded) {
        resp.send({
            succ: true
        });
    } else {
        resp.send({
            succ: false,
            msg: '没有找到用户!'
        });
    }
    resp.end();
});


app.put('/uslg', function (req, resp) {
    //json
    let founded = false;
    for (let uslg of USLG) {
        if (uslg.userName === req.body.userName) {
            uslg.password = req.body.password;
            founded = true;
            break;
        }
    }

    if (founded) {
        resp.send({
            succ: true
        });
    } else {
        resp.send({
            succ: false,
            msg: '没有找到用户!'
        });
    }
    resp.end();
});

// 删除用户
app.delete('/user/:id', function (req, resp) {
    let founded = false;
    let index = 0;
    for (const user of USERS) {
        if (user.id === req.params.id) {
            // USERS.slice(index, 1);
            USERS.splice(index, 1);
            founded = true;
            // break;
        }
        index++;
    }

    if (founded) {
        resp.send({
            succ: true
        });
    } else {
        resp.send({
            succ: false,
            msg: '没有找到需要删除的用户!'
        });
    }
    resp.end();
});


app.delete('/uslg/:userName', function (req, resp) {
    let founded = false;
    let index = 0;
    for (const uslg of USLG) {
        if (uslg.userName === req.params.userName) {
            // USERS.slice(index, 1);
            USLG.splice(index, 1);
            founded = true;
            // break;
        }
        index++;
    }

    if (founded) {
        resp.send({
            succ: true
        });
    } else {
        resp.send({
            succ: false,
            msg: '没有找到需要删除的用户!'
        });
    }
    resp.end();
});

// web服务器监听8888端口
app.listen(8888, function () {
    console.log('服务器在8888端口启动！');
});