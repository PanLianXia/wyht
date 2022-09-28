import { defineComponent, onUpdated, PropType, ref } from 'vue';
import { Flex } from '../layout/Flex';
import { ListView } from '../listview/ListView';
import { ChatCard, ChatCardProps  } from './ChatCard';
import classes from "./card.module.scss"

export const ChatBox = defineComponent({
    props: {
        list: {
            type: Array as PropType<ChatCardProps[]>,
            required: true
        },
        onMessageEnter: {
            type: Function as PropType<(input: string) => void>
        }
    },
    setup({onMessageEnter}) {
        const listView = ref()
        onUpdated(() => {
            listView.value.scrollToBottom()
        })

        return (props: {list: ChatCardProps[]}) => {
            return <div>
                <ListView ref={listView}>
                    {props.list.map((item, i) => <ChatCard key={i} {...item} />)}
                </ListView>
                <MessageInput onMessageEnter={onMessageEnter}/>
            </div>
        }
    }
})

const MessageInput = defineComponent({
    props: {
        onMessageEnter: {
            type: Function as PropType<(input: string) => void>
        }
    },
    setup(props) {
        const ipt = ref<HTMLInputElement | null>(null)
        function handleFinishInput() {
            if(ipt.value !== null) {
                props.onMessageEnter && props.onMessageEnter(ipt.value.value)
                ipt.value.value = ''
            }
        }
        return () => {
            return <Flex type='row' class={classes['message-ipt']}>
                <input  value={''} ref={ipt} onKeyup={e => {
                    if(e.key === 'Enter') {
                        handleFinishInput()
                    }
                }} />
                <button onClick={() => {
                    handleFinishInput()
                }}>发送</button>
            </Flex>
        }
    }
})