import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

import { GA_TRACKING_ID, GTM_ID } from 'src/app/constants/constants'

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
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
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
        <Script
          id="gtag-base"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer', '${GTM_ID}');
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
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
      </body>
    </Html>
  )
}
