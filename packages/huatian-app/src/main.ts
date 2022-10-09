import { createApp } from 'vue'
import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router' 
import App from './App'

const modules = import.meta.glob('./pages/**/*.tsx')
async function run() {
    const routes: RouteRecordRaw[] = []
    for (let path in modules) {
        let mod: any = await modules[path]()
        for (let key in mod) {
            mod[key].displayName = key 
            if(key === 'Home') {
                routes.push({
                    path: '/',
                    name: 'home',
                    component: mod['Home']
                })
                continue
            }

            let routePath = '/' + key.toLowerCase()
            if(mod[key].route) {
                routePath = mod[key].route.path
            }


            routes.push({
                path: routePath,
                name: key,
                component: mod[key]
            })
        }
    }

    const router = createRouter({
        // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
        history: createWebHashHistory(),
        routes, // `routes: routes` 的缩写
      })

    const app = createApp(App, { routes })
    app.use(router)
    app.mount('#app')
}
run()

