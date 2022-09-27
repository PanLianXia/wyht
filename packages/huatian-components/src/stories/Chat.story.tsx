import a1 from '../assets/a1.jpg'
import a2 from '../assets/a2.png'
import { ListView } from '../components/listview/ListView'
import { ChatCard, ChatCardType } from '../components/message/ChatCard'

const list: ChatCardType[] = [{
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

export const ChatExample = () => {
    return <ListView>
        {list.map((item, i) => <ChatCard key={i} {...item} />)}
    </ListView>
}