import { ChatRecord, ChatSession, ChatSessionTopics, User } from "@huatian/domain";
import * as rest from '@huatian/rest'

export class ChatContext {
    private static repo: ChatContext | null = null

    public static getRepo() {
        if(!ChatContext.repo) {
            ChatContext.repo = new ChatContext()
        }
        return ChatContext.repo
    }

    private sessions: ChatSession[] = []
    public currentSession: ChatSession | undefined = undefined
    constructor() {}

    async currentUser() {
        return User.fromJson(await rest.user.get())
    }



    async createSessions() {
        // 获取用户的朋友
        const friends = (await rest.friend.get()).map(user => {
            return User.fromJson(user)
        })

        const currentUser = await this.currentUser()

        this.sessions = friends.map(friend => {
            return new ChatSession(currentUser, friend)
        })

        return this.sessions
    }

    async getSession(receiverId: number) {
        await this.createSessions()
        let that = this
        this.currentSession = this.sessions.find(session => session.getReceiver().getId() === receiverId)
        
        async function loadMessage(){
            const chatList = await rest.message.get(receiverId)
            that.currentSession?.hydrateMessage(chatList)
        }
      
        loadMessage()
      

        // 监听消息
        this.currentSession?.on(ChatSessionTopics.ChatMsgToSend, (msg: string) => {
            rest.message.post(receiverId, msg)
        })
        

        // setInterval(() => {
        //     loadMessage()
        // }, 1000)

        return this.currentSession!
    }
}