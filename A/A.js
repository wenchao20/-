/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Seven
 * @Date: 2023-09-14 15:23:46
 * @LastEditors: Seven
 * @LastEditTime: 2023-09-25 21:07:54
 */
/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Seven
 * @Date: 2023-09-14 15:23:46
 * @LastEditors: Seven
 * @LastEditTime: 2023-09-18 09:11:10
 */



import WebSocket from 'ws'

let a = new WebSocket('ws://localhost:9999') //创建客户端连接实体
    //唯一标识
const w = {
        wy: "A",
        id: 1,
        str: "客户端A发出的消息",
        conne: true,
    } //消息体对象
a.on('open', () => {
        console.log("连接成功")
        a.send(JSON.stringify(w))

    }) //连接成功监听事件

a.on('message', (message) => {
        console.log(JSON.parse(message))

        a.on('close', () => {
            console.log(a.readyState)
        })
    }) //消息接收事件

export default a