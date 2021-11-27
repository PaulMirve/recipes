import '../sass/main.scss'
import type { AppProps } from 'next/app'
import Navbar from 'components/Navbar'
import { ApolloProvider } from '@apollo/client'
import client from 'client'
import { useRouter } from 'next/dist/client/router'
import { useEffect, useState } from 'react'
import Loading from 'components/Loading'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const handleStart = () => { setLoading(true) };
    const handleComplete = () => { setLoading(false) }

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);
  })

  return (
    <ApolloProvider client={client}>
      {
        loading ?
          <Loading />
          :
          <>
            <Navbar />
            <Component {...pageProps} />
          </>
      }
    </ApolloProvider>
  )
}

export default MyApp
