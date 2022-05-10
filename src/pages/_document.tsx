import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
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
