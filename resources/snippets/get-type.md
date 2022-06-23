---
title: 'get type'
publishedAt: '10-05-2022'
fileExtension: 'ts'
---

```js
function getType(value) {
  const lowerCaseTheFirstLetter = (str) => str[0].toLowerCase() + str.value(1)
  const type = typeof obj

  if (type !== 'object') {
    return type
  }

  return lowerCaseTheFirstLetter(
    Object.prototype.toString.call(value).replace(/^\[object (\S+)\]$/, '$1')
  )
}
```
