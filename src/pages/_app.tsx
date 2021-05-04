import { ChakraProvider } from '@chakra-ui/react'
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import theme from '../theme'
import { AppProps } from 'next/app'
import React from 'react';
import Head from 'next/head'

const client = new ApolloClient({
  uri: "https://cric-report-be.amrulla.com/graphql",
  cache: new InMemoryCache()
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider resetCSS theme={theme}>
        <Head>
          <title>Cricket Report Card</title>
        </Head>
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  )
}

export default MyApp
