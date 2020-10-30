import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
 import { setContext } from "@apollo/link-context";

const httpLink = createHttpLink({
  uri: 'https://socialmedia-merng.herokuapp.com/'
})


const authLink = setContext(() => {
  const token = localStorage.getItem('token')

  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : ''
      }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  connectToDevTools: true,
})


export default client