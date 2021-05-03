import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import { ColorModeScript } from '@chakra-ui/react'

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <title>Cricket Report Card</title>
            <meta name='keywords' content='cricket, india, ipl, report, card, rating, review, score'/>
            <meta name='description' content='View and submit your ratings to the each completed cricket match.'/>
            <meta name='subject' content="View and submit your ratings to the each completed cricket match."/>
            <meta name='copyright' content='https://amrulla.com'></meta>
            <meta name='language' content='ES'/>
            <meta name='robots' content='index,follow'></meta>
            <meta name='author' content='Patan Amrulla Khan, pamrulla@gmail.com'></meta>
            <meta name='url' content='https://cric-report.
            amrulla.com'></meta>

            <meta name='og:title' content='Cricket Report Card' />
            <meta name='og:type' content='sports' />
            <meta name='og:url' content='https://cric-report.amrulla.com' />
            <meta name='og:image' content='http://ia.media-imdb.com/rock.jpg' />
            <meta name='og:site_name' content='cric-report.amrulla.com' />
            <meta name='og:description' content='View and submit your ratings to the each completed cricket match.'></meta>

        </Head>
        <body>
          <ColorModeScript />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
