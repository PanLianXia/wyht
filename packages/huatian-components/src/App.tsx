import { defineComponent, PropType } from 'vue'
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

const Menu = ({routes}: {routes: RouteRecordRaw[]}) => <ul class={classes.menu}>
    {
        routes.map(route => 
            { return <li><RouterLink to={route.path}>{route.name}</RouterLink></li>
        })
    }
</ul>