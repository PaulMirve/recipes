import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context';

const authLink = setContext((_, { headers }) => {
    let token: string = "";
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('token')) {
            token = localStorage.getItem('token')!;
        }
    }

    return {
        headers: {
            ...headers,
            authorization: token
        }
    }
});

const httpLink = new HttpLink({ uri: 'https://recipes-backend1.herokuapp.com/graphql' });

export default new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});