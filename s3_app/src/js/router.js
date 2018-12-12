import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeIndexComponent from './components/Home/Index'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        // Home
        {
            path: '/',
            component: HomeIndexComponent,
            children: [],
        }
    ]
})
