import { defineComponent, onMounted, PropType, provide } from "vue"
import { RouteRecordRaw, RouterView } from 'vue-router' 
import classes from './app.module.scss'
import { WebsocketUtil } from "./utils/socket"

export default defineComponent({
    props: {
        routes: {
            type: Array as PropType<RouteRecordRaw[]>,
            required: true
          }
    },
    setup(props) {
        console.log(import.meta.env.HOST)
        const token = sessionStorage['token']
        provide('token', sessionStorage['token'])
        onMounted(() => {
            if(window.WebSocket && sessionStorage['token']) {
                WebsocketUtil.getRepo().init()
            }
            
        })
        return () => {
            if(!token) {
                return <h1>请登录</h1>
            }
            return <>
                 <div class={classes.container}>
                    <RouterView></RouterView>
                 </div>
            </>
        }
    }
})