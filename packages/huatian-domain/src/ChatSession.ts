import { Emiter } from '@huatian/utils' 
import { User } from './User'

// 领域模型
export type ChatRecord = {
    type: 'send' | 'receive',
    message: string
}
export enum ChatSessionTopics {
    ChatListChanged,
    ChatMsgToSend,
    ChatMsgReceived
}
export class ChatSession extends Emiter<ChatSessionTopics> {
    static Topics = ChatSessionTopics
    private chatRecord: ChatRecord[] = []
    constructor(private from: User, private to: User){
        super()
    }

    public getChatRecords() {
        return this.chatRecord
    }

    public getChatList() {
        return this.chatRecord.map(record => {
            return {
                type: record.type,
                content: record.message,
                avatar: record.type === 'send' ?  this.from.getAvatar() : this.to.getAvatar()
            }
        })
    }

    public hydrateMessage(messages: ChatRecord[]) {
        this.chatRecord = messages
        this.emit(ChatSessionTopics.ChatListChanged, this.chatRecord)
    }

    public unread() {
        return this.chatRecord.length
    }

    public lastReceivedMessage() {
        for(let i = this.chatRecord.length -1; i >= 0; i--) {
            const record = this.chatRecord[i]
            if(record.type === 'receive') {
                return record
            }
        }
        return null
    }

    public getReceiver() {
        return this.to
    }

    public receive(msg: string) {
        this.chatRecord.push({
            type: 'receive',
            message: msg
        })
        this.emit(ChatSessionTopics.ChatMsgReceived, msg)
        this.emit(ChatSessionTopics.ChatListChanged)
    }

    public send(msg: string) {
        this.chatRecord.push({
            type: 'send',
            message: msg
        })
        this.emit(ChatSessionTopics.ChatMsgToSend, msg)
        this.emit(ChatSessionTopics.ChatListChanged)
    }
}

export class ChatSessionRepo {
    private sessions : Map<number, Map<number, ChatSession>> = new Map()

    public getSession(from: User, to: User) {
        if(!this.sessions.has(from.getId())) {
            this.sessions.set(from.getId(), new Map())
        }

        const map = this.sessions.get(from.getId())
        if(!map.get(to.getId())) {
            map.set(to.getId(), new ChatSession(from, to))
        }
        return map.get(to.getId())
    }
}

