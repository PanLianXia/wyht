import { defineComponent, PropType, ref } from 'vue'
import { RouteRecordRaw, RouterLink, RouterView } from 'vue-router' 
import classes from './app.module.scss'
import './main.css'

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
                 <Menu routes={props.routes}></Menu>
                 <div class={classes.container}>
                    <RouterView></RouterView>
                 </div>
            </>
        }
    }
})

const Menu = defineComponent({
    props: {
        routes: {
            type: Array as PropType<RouteRecordRaw[]>,
            required: true
        }
    },
    setup(props) {
        const toogle = ref(true)
        return () => {
            return (
                <div class={classes.menu} style={{display: toogle.value ? 'block' : 'none'}}>
                    <ul>
                        {
                            props.routes.map(route => 
                                { return <li><RouterLink to={route.path}>{route.name}</RouterLink></li>
                            })
                        }
                    </ul>
                    <button class={classes.toggle} onClick={() => {toogle.value = false}}>收起</button>
                </div>
            )
        }
    }
})