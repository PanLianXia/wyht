import { defineComponent, reactive, ref } from "vue";
import { CardStack, DiscoverCard } from "../components/discover/CardStack";
import { wait } from '@huatian/utils'
import Mock, { Random } from 'mockjs';

async function mockData() {
    await wait(1000+Math.random()*1000)
    return [...Array(10)].map((_, i) => {
        return {
            id: i,
            img: Random.image("300x600")
        }
    })
    // const mockData =  Mock.mock({
    //     'list|10':[{
    //         'id|+1': 1,
    //         img: '@Image("300x600")'
    //     }]
    // })
    // return mockData.list
}
function useCandidates() {
    const data = ref<DiscoverCard[]>([])
    const ver = ref(0)
    mockData().then(list => {
        data.value = data.value.concat(list)
        ver.value ++
    })
    return {
        removeById(id: number) {
            data.value = data.value.filter(card => card.id !== id)
            ver.value++
        },
        list: data,
        ver
    };
}

export const DiscoverExample = defineComponent({
    setup() {
       
        const { list, removeById, ver } = useCandidates()
        return() => {
            console.log('render', ver.value)
            return <div style={{ height : '600px' }}>
                <CardStack key={ver.value} list={list.value} onConfirm={(card) => {
                    removeById(card.id)
                }}></CardStack>
            </div>
        }
    },
})