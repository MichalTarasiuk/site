import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

import { GA_TRACKING_ID } from 'src/app/constants/constants'

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          rel="preload"
          href="/fonts/Menlo-Regular.ttf"
          as="font"
          type="font/ttf"
          crossOrigin=""
        />
      </Head>
      <body>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){varLOCAL_STORAGE_NAME='theme'varstoredTheme=localStorage.getItem(LOCAL_STORAGE_NAME)if(storedTheme){document.documentElement.setAttribute('data-theme',storedTheme)return}varquery='(prefers-color-scheme:light)'varmatches=window.matchMedia(query).matchesvartheme=matches?'light':'dark'localStorage.setItem(LOCAL_STORAGE_NAME,theme)document.documentElement.setAttribute('data-theme',theme)})()`,
          }}
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
