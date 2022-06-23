---
title: 'remote Add'
publishedAt: '23-06-2022'
fileExtension: 'js'
---

```js
// example 1
function add(...inputs) {
  return inputs.reduce(
    (sumPromise, num) => sumPromise.then((sum) => addRemote(sum, num)),
    Promise.resolve(0)
    // 👆 initializing the sumPromise to be a Promise that resolves to 0
    // so that we can safely call `.then` on it at the first iteration
  )
}

console.time('sequential')
add(1, 2, 3, 4, 5, 6, 7, 8, 9).then((sum) => console.timeEnd('sequential'))
// 939.8701171875 ms

// example 2
function add(...inputs) {
  const promises = []
  while (inputs.length) {
    const [a = 0, b = 0] = inputs.splice(0, 2)
    promises.push(addRemote(a, b))
  }

  return Promise.all(promises).then((sums) =>
    sums.length === 1 ? sums[0] : add(...sums)
  )
}

console.time('concurrent')
add(1, 2, 3, 4, 5, 6, 7, 8, 9).then((sum) => console.timeEnd('concurrent'))
// 413.84619140625 ms
```
