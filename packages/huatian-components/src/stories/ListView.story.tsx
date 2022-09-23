import { defineComponent, reactive } from "vue";
import {ListView} from '../components/listview/ListView'

export const ListViewExample = defineComponent({
    setup() {
        const list = reactive<any[]>([])
        async function fetchData() {
            console.log('加载数据')
            return new Promise((resolve) => {
                setTimeout(() => {
                    list.push(...Array(10))
                    resolve(null)
                }, Math.floor( Math.random() * 2000));
            })
        }
        return () => {
            return <ListView onBottom={fetchData}>
                {
                    list.map((_, i) => {
                        return <Card />
                    })
                }
            </ListView>
        }
    }
})

const Card = () => {
    return <div style={{
        width : '100%',
        height : '200px',
        background : 'blue',
        marginBottom : '10px'
    }}></div>
}