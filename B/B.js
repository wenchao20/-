/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Seven
 * @Date: 2023-09-14 15:24:11
 * @LastEditors: Seven
 * @LastEditTime: 2023-09-19 14:37:57
 */
import WebSocket from 'ws'

// import server from 'nodejs-websocket';

let a = new WebSocket('ws://localhost:9999')
    //唯一标识
const w = {
    wy: "B",
    id: 2,
    str: "客户端B发出的消息",
    conne: false
}
a.on('open', () => {
    console.log("连接成功")
    a.send(JSON.stringify(w))

})

a.on('message', (message) => {
    console.log(JSON.parse(message))
    a.on('close', () => {
        console.log(a.readyState)
    })
})