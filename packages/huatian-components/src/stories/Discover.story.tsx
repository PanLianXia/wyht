import { defineComponent, reactive, ref } from "vue";
import { CardStack, SocialCardProps } from "../components/discover/CardStack";
import { DiscoveryCard, DiscoveryCardProps } from "../components/discover/Discoverycard";
import { wait } from '@huatian/utils'
import Mock, { Random } from 'mockjs';
import a1 from '../assets/a1.jpg'
import a2 from '../assets/a2.png'
import { ListView } from "../components/listview/ListView";

async function mockData() {
    await wait(1000+Math.floor(Math.random()*1000))
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

async function mockDataDiscoverList() {
    await wait(1000+Math.floor(Math.random()*1000))
    return [...Array(10)].map((_, i) => {
        return {
            title: Random.ctitle(),
            content: Random.csentence(),
            cover: Random.image('100x100'),
            avatar: [a1, a2][Math.floor(Math.random() * 2)]
        }
    })
}

function useCandidates() {
    const data = ref<SocialCardProps[]>([])
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

function useDiscoveryList() {
    const data = ref<DiscoveryCardProps[] | null>(null)

    async function load() {
        const list = await mockDataDiscoverList()
        if(data.value === null) {
            data.value = []
        }
        data.value = data.value.concat(list)
    }

    load()
    
    return { list: data, loadMore: load }
}

export const SocialExample = defineComponent({
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

export const DiscoverListExample = defineComponent({
    setup() {
        const { list, loadMore } = useDiscoveryList()
        return () => {
            return <ListView onBottom={loadMore}>
                {list.value === null && <div>Loading</div>}
                {list.value &&  list.value.map((item, i) => <DiscoveryCard key={i} {...item}></DiscoveryCard>)}
            </ListView>
        }
    }
})