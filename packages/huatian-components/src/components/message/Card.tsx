import { defineComponent, StyleValue } from 'vue';
import { Flex } from '../layout/Flex';
import classes from './card.module.scss'

export const MessageCard = defineComponent({
    props: {
        avatar: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        short: {
            type: String,
            required: true
        },
        time: {
            type: String,
            required: true
        },
        unread: {
            type: Number,
        }
    },
    setup(props) {
        return () => {
            return <Flex class={classes['user-message']}>
                {/* 头像 */}
                <Avatar url={props.avatar} size='small' style={{marginRight: '20px'}}/>
                <Flex type='column' class={classes['middle-box']}>
                    {/* 发消息的名字 */}
                    <div class={classes.username}>{props.name}</div>
                    {/* 消息内容的简写 */}
                    <div class={classes.short}>{props.short}</div>
                </Flex>
                <Flex type='column' class={classes.right} align='flex-end'>
                    {/* 时间 */}
                    <div class={classes.time}>{props.time}</div>
                    {/* 未读消息数 */}
                    <Unread unread={props.unread} />
                </Flex>
            </Flex>
        }
    }
})

const Unread = ({ unread } : { unread?: number }) => {
    if(!unread) {
        return null
    }
    return <div class={classes.unread}>{unread}</div>
}

const Avatar = ({ url, style, size='medium' } : { url: string, style: StyleValue, size?: "small" | "medium" | "larget"}) => {
    return <img class={`${classes.avatar} ${classes[size]}`} style={style} src={url} alt='' />
}