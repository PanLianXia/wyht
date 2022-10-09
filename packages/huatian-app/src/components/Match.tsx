import { defineComponent, ref, renderSlot } from "vue";
import { CardStack, SocialCardProps } from "@huatian/components";
import { wait } from '@huatian/utils'
import Mock, { Random } from 'mockjs';
import * as rest from '@huatian/rest'

async function mockData() {
    const candidates = await rest.candidates.get()
    return candidates.map((x: any) => {
        return {
            id: x.id,
            img: x.avatar
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
        async likeOrDisLike(id: number, like: boolean) {
            if(like) {
                await rest.friend.put(id)
            }
            data.value = data.value.filter(card => card.id !== id)
            ver.value++
        },
        list: data,
        ver
    };
}

export const Match = defineComponent({
    setup() {
       
        const { list, likeOrDisLike, ver } = useCandidates()
        return() => {
            console.log('render', ver.value)
            return <div style={{ height : '600px' }}>
                <CardStack key={ver.value} list={list.value} onConfirm={(card, like) => {
                    // removeById(card.id)
                    likeOrDisLike(card.id, like)
                }}></CardStack>
            </div>
        }
    },
})