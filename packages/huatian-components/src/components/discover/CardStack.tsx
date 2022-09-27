import { computed, defineComponent, PropType, reactive, ref, StyleValue, watch } from "vue";
import classes from './CardStack.module.scss'

export type DiscoverCard = {
    id: number,
    img: string
}
export const CardStack = defineComponent({
    props: {
        list: {
            type: Array as PropType<DiscoverCard[]>,
            required: true
        },
        onConfirm: {
            type: Function as PropType<(card: DiscoverCard) => void>
        }
    },
    setup({onConfirm}) {
        function confirm(card: DiscoverCard) {
            onConfirm && onConfirm(card)
        }
        return ({list}: {
            list: DiscoverCard[]
        }) => {
            console.log('render card stack')
            return <div class={classes['card-stack']}>
                {
                    list.map((card, i) => <Card key={card.id} card={card} index={i} onConfirm={() => confirm(card)}></Card>)
                }
            </div>
        }
    }
})

function useTouchEvents(enable: boolean = true) {
    const diff = reactive({x: 0, y:0})
    const state = ref<'init'|'start'|'release'|'move'>('init')
    let startX: number = 0, startY: number = 0
    function handleStart(e: TouchEvent) {
        if(e.touches.length === 1) {
            startX = e.touches[0].clientX
            startY = e.touches[0].clientY
            state.value = 'start'
        }
    }
    function handleMove(e: TouchEvent) {
        if(e.touches.length === 1) {
            diff.x = e.touches[0].clientX - startX
            diff.y = e.touches[0].clientY - startY
            state.value = 'move'
        }
    }
    function handleEnd(e: TouchEvent) {
        state.value = 'release'
        // diff.x = 0;
        // diff.y = 0;
    }
    return {
        handlers: enable ? {
            onTouchstart: handleStart,
            onTouchmove: handleMove,
            onTouchend: handleEnd
        } : {},
        diff,
        state,
        reset: () => {
            diff.x = 0,
            diff.y = 0,
            state.value = 'init'
        }
    }
}
const Card = defineComponent({
    props: {
        card: {
            type: Object as PropType<DiscoverCard>,
            required: true
        },
        index: {
            type: Number,
            required: true
        },
        onConfirm: {
            type: Function as PropType<(card: DiscoverCard) => void>
        }
    },
    setup({card, index, onConfirm}) {
        const { handlers, diff, state, reset } = useTouchEvents(index == 0) 
        // 旋转的角度
        const trans = computed(() => {
            const w = window.innerWidth;
            const translateXValue = diff.x * 0.3;
            const rotateZValue= diff.x / w * 50;
            return [rotateZValue, translateXValue]
        })
        watch(state, () => {
            if(state.value === 'release') {
                if(Math.abs(trans.value[0]) > 30) {
                    console.log('confirm', trans.value[0])
                    onConfirm && onConfirm(card)
                } else {
                    console.log('cancel',  trans.value[0])
                    reset()
                }
            } else {

            }
        })
        return () => {
            const style = {
                zIndex: 1000-index,
                transformOrigin: 'bottom center',
                transform: `translate(${0 + trans.value[1]}px, ${index * 10}px) scale(${(1 - index / 50).toFixed(2)}) rotateZ(${trans.value[0]}deg)`
            }
            return <div class={classes.card} style={style} {...handlers}>
                <img src={card.img}></img>
            </div>
        }
    }
})