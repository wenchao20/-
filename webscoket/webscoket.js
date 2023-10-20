/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Seven
 * @Date: 2023-09-14 15:23:31
 * @LastEditors: Seven
 * @LastEditTime: 2023-10-17 10:34:37
 */


const WebSocket = require('ws')
const mysql = require("mysql")
const http = require('http')
const { Console } = require('console')
const server = new WebSocket.Server({ port: 9999 }) //创建websocket服务器，创建端口
const b = new Map() //con连接实体作为key，message作为value，此map对象作为消息传递者
const c = new Map() //message连接实体作为key，con作为value，此map对象作为消息发出者
let d = '' //存储A发来的消息

//S  mysql数据库


// end
server.on('connection', (con, req) => {

    const url = new URL(req.url, 'ws://localhost:9999')
    console.log(url.searchParams.get('userid'))

    if (1 == con.readyState) { //判断连接实体状态
        console.log("连接成功")
        con.send(JSON.stringify("服务器发出的消息"))


        con.on('message', (message) => { //接收消息
            const db = mysql.createConnection({ //添加数据库连接
                host: "localhost",
                user: "root",
                password: "wenchao123",
                database: "wc_lx",
                port: 3306
            })
            db.connect((err) => { //数据库连接
                if (err) {
                    console.log("----------------------")
                    console.log("mysql连接失败" + err)
                    console.log("----------------------")
                    return
                } else {
                    console.log("----------------------")
                    console.log("mysql连接成功")
                    console.log("----------------------")
                }
            })
            db.query(("SELECT message FROM a_table"), (err, result) => { //数据库语句执行
                if (err) {
                    console.log("----------------------")
                    console.log("mysql查询失败")
                    console.log("----------------------")
                    return
                }
                console.log("----------------------")
                d = result //获得数据库内容
                console.log(result)
                console.log("----------------------")
            })
            db.end((err) => { //关闭数据库
                if (err) {
                    console.log("----------------------")
                    console.log("关闭数据库连接失败" + err)
                    console.log("----------------------")
                } else {
                    console.log("----------------------")
                    console.log("连接成功关闭")
                    console.log("----------------------")
                }
            })
            const cliID = JSON.parse(message) //将消息message传递给cliID,同时将json形式转为对象
            console.log(cliID.send_str)

            b.set(con, cliID) //设置con连接实体读取消息映射
            c.set(cliID.id, con) //设置消息读取con连接实体映射
            if (b.get(con).id == 1) { //判断连接实体状态，是否符合发出者与接收者id
                d = b.get(con).send_str
                c.get(cliID.id).send(JSON.stringify(d))
                console.log(d)
            } else if (b.get(con).id == 2) {
                c.get(cliID.id).send(JSON.stringify(
                    d
                ))
                d = ''
            }
            // c.get(cliID.id).send(JSON.stringify(cliID))

        })


    } else if (con.readyState == 0) {
        console.log("正在连接")

    } else if (con.readyState == 3) {
        console.log("连接失败")

    } else if (con.readyState == con.CLOSING) {
        console.log("正在关闭连接")

    }
})