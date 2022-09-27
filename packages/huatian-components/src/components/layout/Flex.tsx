import { defineComponent, PropType } from 'vue';
import classes from './layout.module.scss'

export const Flex = defineComponent({
    props: {
        type: {
            type: String as PropType<'row' | 'column'>,
            default: 'row'
        },
        class: {
            type: String
        },
        align: {
            type: String as PropType<'flex-start' | 'center' | 'flex-end'>
        },
        flex: {
            type: Number,
        },
        justify: {
            type: String as PropType<'flex-start' | 'center' | 'flex-end' | 'space-between'>
        }
    },
    setup(props, ctx) {
        // props属性也可以写到return渲染函数中。
        // 如果写到return渲染函数中，如果外边属性变化了里边也需要重绘
        // 如果写到setup中，只会初始化一次是不会变化的
        // return ({type}: {type: 'row' | 'column'}) => {}
        return () => {
            const finalClass = `${classes.flex} ${classes[props.type]} ${props.class || ''} ${classes['align-'+ props.align] || ''} ${classes['justify-'+ props.justify] || ''}`
            return <div class={finalClass} style={{flex: props.flex || ''}}>
                {ctx.slots.default!()}
            </div>
        }
    }
})