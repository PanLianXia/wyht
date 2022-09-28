import { Emiter } from '@huatian/utils' 
// 领域模型
type ChatRecord = {
    type: 'send' | 'receive',
    message: string
}
enum ChatSessionTopics {
    ChatListChanged
}
export class ChatSession extends Emiter<ChatSessionTopics> {
    static Topics = ChatSessionTopics
    private chatRecord: ChatRecord[] = []
    constructor(private from: User, private to: User){
        super()
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

    public receive(msg: string) {
        this.chatRecord.push({
            type: 'receive',
            message: msg
        })
        this.emit(ChatSessionTopics.ChatListChanged)
    }

    public send(msg: string) {
        this.chatRecord.push({
            type: 'send',
            message: msg
        })
        this.emit(ChatSessionTopics.ChatListChanged)
    }
}

export class User {
    constructor(
        private id: number,
        private uname: string,
        private avatar: string
    ) {}

    createChatSession(to: User) {
        const session = new ChatSession(this, to)
        return session
    }

    getAvatar() {
        return this.avatar
    }
}