import Vue from 'vue'
import apolloProvider from './utilities/apollo'
import vuetify from './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
    faStar,
    faShare,
    faTimes,
    faPhoneAlt,
    faEnvelope,
    faGlobe,
    faTrashAlt,
    faPencilAlt,
    faEye,
    faHeart,
    faDollarSign,
    faSyncAlt,
    faShoppingBag,
    faHome,
    faPlusSquare,
    faSave,
    faCaretLeft,
    faCaretRight,
    faFilter,
    faEllipsisV,
    faBars
} from '@fortawesome/free-solid-svg-icons'
import {
    faFacebookSquare,
    faApple,
    faGoogle,
    faInstagram,
    faWhatsapp,
    faLinkedin,
    faTwitter
} from '@fortawesome/free-brands-svg-icons'; // confuso https://www.npmjs.com/package/@fortawesome/vue-fontawesome#using-brand-icons

import "@/assets/global.css"

Vue.config.productionTip = false;
library.add(faStar, faShare, faTimes,
    faPhoneAlt, faEnvelope, faGlobe,
    faTrashAlt, faPencilAlt, faEye,
    faHeart, faDollarSign, faSyncAlt,
    faShoppingBag, faHome, faPlusSquare,
    faSave,faCaretLeft, faCaretRight,
    faFilter, faEllipsisV, faBars,
    faFacebookSquare, faApple, faGoogle,
    faInstagram, faWhatsapp, faLinkedin,
    faTwitter);
Vue.component('font-awesome-icon', FontAwesomeIcon);

new Vue({
    router,
    store,
    vuetify,
    apolloProvider,
    render: h => h(App)
}).$mount('#app')