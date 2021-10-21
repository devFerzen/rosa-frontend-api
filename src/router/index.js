import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Compras from '../views/Compras.vue'
import Dashboard from '../views/Dashboard.vue'
import Error404 from '../views/Error404.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'home',
        component: Home,
        props: route => ({ id: route.query.q })
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
        props: route => ({ id: route.query.q })
    },
    {
        path: '/compras',
        name: 'compras',
        component: Compras
    },
    {
        path: '*',
        name: 'error-404',
        component: Error404
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router