import { defineComponent, ref } from 'vue';
import { ListView, MessageCard } from '@huatian/components';
import a1 from '../assets/a1.jpg'
import a2 from '../assets/a2.png'
import { RouterLink } from 'vue-router';
import { ChatContext } from '../context/ChatContext';
import { ChatSession } from '@huatian/domain';

export const Friends = defineComponent({
    setup() {
        const list = ref<ChatSession[]>([])

        const chatContext = ChatContext.getRepo()
        chatContext.createSessions().then(sessions => {
            list.value = sessions
        })

        // const list = [{
        //     avatar: a1,
        //     name: '张三',
        //     short: '你好啊',
        //     time: '1分钟前',
        //     unread: 0
        // }, {
        //     avatar: a2,
        //     name: '李四',
        //     short: '在做什么',
        //     time: '1分钟前',
        //     unread: 10
        // }]
        return () => <ListView>
            {
                list.value.map((session, i) => {
                    const lastRev = session.lastReceivedMessage()
                    const short = lastRev ? lastRev.message : ''

                    return <RouterLink key={i} to={`/chat/${session.getReceiver().getId()}`}>
                        <MessageCard 
                            avatar={session.getReceiver().getAvatar()}
                            name={session.getReceiver().getName()}
                            short={short}
                            unread={session.unread()}
                            time='今天'
                        >

                        </MessageCard>
                    </RouterLink>
                })
            }
            
        </ListView>
    }
})