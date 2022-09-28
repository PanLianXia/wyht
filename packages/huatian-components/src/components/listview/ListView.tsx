import { defineComponent, PropType, ref, watch } from "vue";
import classes from './ListView.module.scss'

export const ListView = defineComponent({
    props: {
        onBottom: {
            type: Function as PropType<() => Promise<unknown>>
        }
    },
    setup({onBottom}, ctx) {
        const bottomRef = ref<HTMLDivElement | null>(null)
        const loading = ref<Boolean>(false)

        // 把函数expose出去
        ctx.expose({
            scrollToBottom: () => {
                window.scrollTo(0, Number.MAX_SAFE_INTEGER)
            }
        })

        watch(bottomRef, () => {
            if(!bottomRef.value) return

            const options: IntersectionObserverInit = {
                root: null,
                threshold: [0.5, 0.7, 1],
                rootMargin: '100px'
            }

            const intersectionHandler: IntersectionObserverCallback = async (entries) => {
                // entries.forEach(entry => {
                //     console.log(entry.intersectionRatio)
                // })
                if(loading.value) return

                for(let entry of entries) {
                    console.log(entry.intersectionRatio)
                    if(onBottom) {
                        try {
                            loading.value = true
                            // 如果数据请求失败了，可以添加一个状态，这个状态可以手动拉取数据
                            await onBottom()
                        } finally {
                            loading.value = false
                        }
                    }
                }
            }
            const observer = new IntersectionObserver(intersectionHandler, options)

            observer.observe(bottomRef.value!)
        })
        return () => {
            return <div class={classes.listview}>
                {/* <Card />  200px
                <Card />  150px
                <divs style={{}}></div>
                --------
                <Card />
                <Card />
                <Card />
                -------
                <Card />
                <Card /> */}
                {ctx.slots.default!()}
                <div ref={bottomRef} class={classes['bottom-bar']}></div>
            </div>
        }
    }
})