// A minified version is inlined in _document.tsx

;(function () {
  var LOCAL_STORAGE_NAME = 'theme'
  var storedTheme = localStorage.getItem(LOCAL_STORAGE_NAME)

  if (storedTheme) {
    document.documentElement.setAttribute('data-theme', storedTheme)
    return
  }

  var query = '(prefers-color-scheme: light)'
  var matches = window.matchMedia(query).matches
  var theme = matches ? 'light' : 'dark'

  localStorage.setItem(LOCAL_STORAGE_NAME, theme)
  document.documentElement.setAttribute('data-theme', theme)
})()
