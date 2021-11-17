import Vue from 'vue'
import store from '../store'

import Vuetify from 'vuetify/lib'

import VueApollo from 'vue-apollo'
import { setContext } from 'apollo-link-context'
import ApolloClient from 'apollo-client' //AFSS: Creo que esta importación es la unica que puede
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error';

Vue.use(Vuetify);

Vue.use(VueApollo);
const httpLink = new HttpLink({ uri: 'http://localhost:3000/graphql', credentials: "include" });
const cache = new InMemoryCache({
    addTypename: false //Borra los __typename de los querys o mutaciones
});

const logoutLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
        );
    if (networkError) console.log(`[Network error]: ${networkError}`);
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
const prelink = logoutLink.concat(httpLink);
const link = middlewareLink.concat(prelink);
const apolloProvider = new VueApollo({
    defaultClient: new ApolloClient({
        link,
        cache,
        uri: "http://localhost:3000/graphql", //"http://192.168.100.69:3000/graphql",
        credentials: 'include',
        connectToDevTools: true //ApolloDev browser tool 
    })
});

export default apolloProvider;

