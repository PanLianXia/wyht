import { defineComponent, ref } from 'vue';
import { ListView, ChatCard, ChatCardProps, ChatBox } from '@huatian/components'
import { ChatSession, User } from '@huatian/domain'
import { useRoute } from 'vue-router';
import a1 from '../assets/a1.jpg'
import a2 from '../assets/a2.png'
import { ChatContext } from '../context/ChatContext';

const list: ChatCardProps[] = [{
    avatar: a1,
    type: 'receive',
    content: '你好！今天有时间么？'
}, {
    avatar: a2,
    type: 'send',
    content: '有时间？怎么了？'
}, {
    avatar: a1,
    type: 'receive',
    content: '出来玩啊'
}]

export const ChatCardExample = () => {
    return <ListView>
        {list.map((item, i) => <ChatCard key={i} {...item} />)}
    </ListView>
}

// function useMockedChatSession() {
//     const self = new User(1,'张三',a1)
//     const to = new User(2,'李四',a2)
//     const session = self.createChatSession(to)
//     const list = ref(session.getChatList())
//     session.on(ChatSession.Topics.ChatListChanged, () => {
//         list.value = session.getChatList()
//     })

//     setInterval(() => {
//         session.receive(Math.random() + '')
//     }, 1000)

//     return {list, session}
// }

function useChatSession() {
    const route = useRoute()
    const receiverId = parseInt(route.params.id as string)
    const chatContexnt = new ChatContext()
    const list = ref<ChatCardProps[]>([])
    const session = ref<ChatSession | null>(null)
    chatContexnt.getSession(receiverId)
      .then(chatSession => {
        session.value = chatSession
        list.value = chatSession.getChatList()
        chatSession.on(
          ChatSession.Topics.ChatListChanged,
          () => {
            list.value = chatSession.getChatList()
          }
        )
      })
    return {list, session}
}

export const Chat = defineComponent({
    setup() {
        const { list, session } = useChatSession()
        console.log(session.value)
        return () => {
            if (!session.value) {
                return null
            }
            return <ChatBox list={list.value} onMessageEnter={(message) => {
                session.value!.send(message)
            }} />
        }
    }
})

Chat.route = {
    path: '/chat/:id'
}