import { ChatSessionTopics } from "@huatian/domain";
import { ChatContext } from "../context/ChatContext";
import * as rest from '@huatian/rest'

export class WebsocketUtil {
    private static repo:  WebsocketUtil

    public static getRepo() {
        if(!WebsocketUtil.repo) {
            WebsocketUtil.repo = new WebsocketUtil()
        }
        return WebsocketUtil.repo
    }
    private static ws: WebSocket | null = null

    public init() {
        WebsocketUtil.ws = new WebSocket(`ws://192.168.1.16:8001/${sessionStorage['token'].split('-')[1]}`)
        WebsocketUtil.ws.onopen = function (e) {
            console.log("链接服务器成功");
            // ws.send(that.contentText);
            // callback();
        };
        WebsocketUtil.ws.onclose = function (e) {
            console.log("服务器关闭")
        };
        WebsocketUtil.ws.onerror = function () {
            console.log("服务器出错")
        };
        WebsocketUtil.ws.onmessage = function (e) {
            console.log('接受到的消息', e)
            let messageData = JSON.parse(e.data)
            if(messageData.type === 'receiveMsg') {
                const chatContexnt = ChatContext.getRepo()
                if(chatContexnt.currentSession) {
                    chatContexnt.currentSession.receive(messageData.msg)
                }
            }
        }
    }

    public sendMsg(toId: number, msg: string) {
        if(!WebsocketUtil.ws) return
        let message = JSON.stringify({
            toId,
            msg
        })
        WebsocketUtil.ws.send(message)
    }
}