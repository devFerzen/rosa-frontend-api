import Vue from 'vue'

import Vuetify from 'vuetify/lib'

import VueApollo from 'vue-apollo'
import { setContext } from 'apollo-link-context'
import ApolloClient from 'apollo-client' //AFSS: Creo que esta importación es la unica que puede
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error';

import Cookies from 'js-cookie'

Vue.use(Vuetify);

const httpLink = new HttpLink({ 
    //uri: '/graphql', 
    uri: 'http://localhost:3080/graphql',
    credentials: "omit" 
});
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
    const token = Cookies.get('auth-token');

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
        uri: "http://localhost:3080/graphql",
        //uri: "/graphql",
        //credentials: 'include',
        connectToDevTools: true //ApolloDev browser tool 
    })
});

Vue.use(VueApollo);
export default apolloProvider;