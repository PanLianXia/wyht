import { defineComponent, PropType, Ref, ref } from 'vue'
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

function useToogle(): [Ref<boolean>, () => void] {
    const value = ref(sessionStorage['toogle-value'] !== 'false')

    function toogle() {
        value.value = !value.value
        sessionStorage['toogle-value'] = value.value
    }

    return [value, toogle]
}
const Menu = defineComponent({
    props: {
        routes: {
            type: Array as PropType<RouteRecordRaw[]>,
            required: true
        }
    },
    setup(props) {
        const [toogleValue, toogle] = useToogle()
        return () => {
            return (
                <div class={classes.menu} style={{display: toogleValue.value ? 'block' : 'none'}}>
                    <ul>
                        {
                            props.routes.map(route => 
                                { return <li key={route.name} onClick={() => toogle()}><RouterLink to={route.path}>{route.name}</RouterLink></li>
                            })
                        }
                    </ul>
                    <button class={classes.toggle} onClick={() => {toogle()}}>收起</button>
                </div>
            )
        }
    }
})