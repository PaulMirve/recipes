import '../sass/main.scss'
import type { AppProps } from 'next/app'
import Navbar from 'components/Navbar'
import { ApolloProvider } from '@apollo/client'
import client from 'client'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Navbar />
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
