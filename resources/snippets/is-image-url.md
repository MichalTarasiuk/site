---
title: 'is image url'
publishedAt: '23-06-2022'
fileExtension: 'js'
---

```js
function isImgUrl(url) {
  return fetch(url, { method: 'HEAD' }).then((res) => {
    return res.headers.get('Content-Type').startsWith('image')
  })
}
```
