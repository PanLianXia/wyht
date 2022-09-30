import { defineComponent, PropType } from "vue"
import { RouteRecordRaw, RouterView } from 'vue-router' 
import classes from './app.module.scss'

export default defineComponent({
    props: {
        routes: {
            type: Array as PropType<RouteRecordRaw[]>,
            required: true
          }
    },
    setup(props) {
        return () => {
            return <>
                 <div class={classes.container}>
                    <RouterView></RouterView>
                 </div>
            </>
        }
    }
})