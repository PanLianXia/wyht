import { defineComponent, PropType, reactive, ref, provide, inject } from "vue";
import classes from './tabs.module.scss'


type RenderMenuItem = ({isActive}: {isActive: Boolean}) => JSX.Element
type TabMenu = {
    render: RenderMenuItem
}

const _Tabs = defineComponent({
    props: {
        defaultActiveIndex: {
            type: Number
        },
        scrollBehavior: {
            type: String as PropType<'body' | 'inner'>,
            default: "body"
        }
    },
    setup(props, ctx) {

        const tabs = reactive<Array<TabMenu>>([])
        let activeIndex = ref(props.defaultActiveIndex || 0)
        provide('tabs', tabs)

        return () => {
            const defaultSlot = ctx.slots.default!
            const vNodes = defaultSlot().map((vNode, i) => {
                if(!vNode.props) vNode.props = {}
                if(!vNode.props.style) vNode.props.style = {}

                if(props.scrollBehavior === 'body') {
                    vNode.props.style.overflow = 'unset'
                } else {
                    vNode.props.style['overflow-y'] = 'auto'
                }
                vNode.props.activeIndex = activeIndex.value;
                vNode.props.index = i;
                return vNode
            })
            return (
                <div class={classes.tabs}>
                    {vNodes}
                    <TabMenu scrollBehavior={props.scrollBehavior} tabs={tabs} activeIndex={activeIndex.value} onActiveIndexChanged={(idx) => {
                        activeIndex.value = idx
                    }}  />
                </div>
            )
        } 
    }
})

const TabMenu = ({tabs, activeIndex, onActiveIndexChanged, scrollBehavior} : {
    tabs: TabMenu[], 
    activeIndex: number,
    scrollBehavior: 'body' | 'inner'
    onActiveIndexChanged?: (index: number) => void
}) => {
    return <div class={classes.menu} style={{position: scrollBehavior === 'body' ? 'fixed' : 'absolute'}}>
        {
            tabs.map((tab, i) => {
                return <div class={classes['menu-item']} onClick={() => {
                    (activeIndex !== i) && onActiveIndexChanged && onActiveIndexChanged(i)
                }}>
                    {tab.render({isActive: activeIndex === i})}
                </div>
            })
        }
    </div>
}

const Tab = defineComponent({
    props: {
        renderMenu: {
            required: true,
            type: Function as PropType<RenderMenuItem>
        },
        activeIndex: {
            type: Number
        },
        index: {
            type: Number
        },
        style: {
            type: Object
        }
    },
    setup(props, ctx) {
        let tabs: TabMenu[] = inject('tabs') as TabMenu[]
        tabs.push({
            render: props.renderMenu
        })
        
        return () => {
            const defaultSlot = ctx.slots.default!
            const show = props.activeIndex === props.index
            if(!show) return null
            
            return <div class={classes.tab} style={{display: show ? 'block' : 'none', ...props.style}}>
                {defaultSlot()}
            </div>
        }
    },
})

_Tabs.Tab = Tab

export const Tabs = _Tabs as typeof _Tabs & {Tab: typeof Tab}