import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faStar, faShare, faTimes,
          faPhoneAlt, faEnvelope, faGlobe,
          faTrashAlt, faPencilAlt, faEye,
          faHeart, faDollarSign, faSyncAlt,
          faShoppingBag, faHome, faPlusSquare,
          faSave
        } from '@fortawesome/free-solid-svg-icons'
import { faFacebookSquare, faApple, faGoogle,
          faInstagram, faWhatsapp, faLinkedin,
          faTwitter
        } from '@fortawesome/free-brands-svg-icons'; // confuso https://www.npmjs.com/package/@fortawesome/vue-fontawesome#using-brand-icons

Vue.config.productionTip = false;
library.add(faStar, faShare, faTimes,
            faPhoneAlt, faEnvelope, faGlobe,
            faTrashAlt, faPencilAlt, faEye,
            faHeart, faDollarSign, faSyncAlt,
            faShoppingBag, faHome, faPlusSquare,
            faSave,
            faFacebookSquare, faApple, faGoogle,
            faInstagram, faWhatsapp, faLinkedin,
            faTwitter);
Vue.component('font-awesome-icon', FontAwesomeIcon);


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
