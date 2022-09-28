import { defineComponent, ref } from 'vue';
import a1 from '../assets/a1.jpg'
import a2 from '../assets/a2.png'
import { ListView } from '../components/listview/ListView'
import { ChatCard, ChatCardProps } from '../components/message/ChatCard'
import { ChatBox } from '../components/message/ChatBox';
import { ChatSession, User } from '@huatian/domain'

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

function useMockedChatSession() {
    const self = new User(1,'张三',a1)
    const to = new User(2,'李四',a2)
    const session = self.createChatSession(to)
    const list = ref(session.getChatList())
    session.on(ChatSession.Topics.ChatListChanged, () => {
        list.value = session.getChatList()
    })

    setInterval(() => {
        session.receive(Math.random() + '')
    }, 1000)

    return {list, session}
}

export const ChatExample = defineComponent({
    setup() {
        
        const { list, session } = useMockedChatSession()
        return () => {
            return <ChatBox list={list.value} onMessageEnter={(message) => {
                session.send(message)
            }} />
        }
    }
})