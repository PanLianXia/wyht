let ws = require('nodejs-websocket')

console.log('开始建立连接')
let connectMap = new Map()
ws.createServer((connect) => {
    let connectId = connect.path.replace('/', '')
    connectMap.set(connectId, connect)
    connect.on('text', (str) => {
        console.log('收到的信息为：', str)
        // connect.send(`${str}（机器人`)

        let messageData = JSON.parse(str)
        let toId = messageData.toId
        console.log('toId', connectMap)
        connectMap.get(toId.toString()).send(JSON.stringify({
            type: 'receiveMsg',
            fromId: connectId,
            toId: toId,
            msg: messageData.msg
        }))
    })

    connect.on('close', (code, reason) => {
        console.log('关闭连接')
    })

    connect.on('error', (code, reason) => {
        console.log('异常关闭')
    })
}).listen(8001)
console.log('连接建立完毕')