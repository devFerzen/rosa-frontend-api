import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import vuetify from './plugins/vuetify'
import Vuetify from 'vuetify/lib'

import { cerrarSesion } from './utilities/generalUse'

import VueApollo from 'vue-apollo'
import { setContext } from 'apollo-link-context'
import ApolloClient from 'apollo-client'
  import { InMemoryCache } from 'apollo-cache-inmemory'
  import { HttpLink } from 'apollo-link-http'
  import { onError } from 'apollo-link-error';


import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
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
Vue.use(Vuetify);

Vue.use(VueApollo);
const httpLink = new HttpLink({ uri: 'http://localhost:3000/graphql', credentials: "include" });
const cache = new InMemoryCache();

const logoutLink = onError(({ networkError }) => {
 if (networkError.statusCode === 401) cerrarSesion();
 if (networkError.statusCode === 489) regeneracionSesion();
})

//Extraer el token de localstorage a la mejor
const middlewareLink = setContext((_, { headers }) => {
  const token = store.state.usuario.usuario.token;
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});
const link = middlewareLink.concat(httpLink, logoutLink);

const apolloProvider = new VueApollo({
    defaultClient: new ApolloClient({
        link,
        cache,
        uri: "http://localhost:3000/graphql", //"http://192.168.100.69:3000/graphql",
        credentials: 'include'
        //connectToDevTools: true //ApolloDev browser tool 
      })
});

new Vue({
  router,
  store,
  vuetify,
  apolloProvider,
  render: h => h(App)
}).$mount('#app')
