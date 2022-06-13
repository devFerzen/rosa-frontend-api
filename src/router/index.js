import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Compras from '../views/Compras.vue'
import Dashboard from '../views/Dashboard.vue'
import Error404 from '../views/Error404.vue'
import store from '../store'

Vue.use(VueRouter);

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
        beforeEnter(to, from, next){
            const cuentaConRegistro = store.getters.usuarioLoggeado;
            /*//Aqui que valide inicio de sesion de llamada...
            if(!!cuentaConRegistro){
                console.log("Cuenta con registro");
                next();
            }else{
                console.log("Guard no cuenta con registro");
                store.dispatch('panelHerramientasInicioSesion', true);
                next({path: '/'});
            }*/
            next();
        }
    },
    {
        path: '/compras',
        name: 'compras',
        component: Compras,
        beforeEnter(to, from, next){
            const cuentaConRegistro = store.getters.usuarioLoggeado;
            /*
            if(!!cuentaConRegistro){
                next();
            }else{
            /*
                store.dispatch('panelHerramientasInicioSesion', true);
                next({path: '/'});
            }*/
            next();
        }
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
});

router.beforeEach(async (to, from, next) => {
    //await store.dispatch('usuarioIdentificacion');
    next();
});

export default router