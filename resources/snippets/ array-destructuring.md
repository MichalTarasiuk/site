---
title: 'array destructuring'
publishedAt: '24-06-2022'
fileExtension: 'js'
---

```js
const fruits = ['Apple 🍏', 'Banana 🍌', 'Strawberry 🍓', 'Blueberry 🫐']

// Grab first and last item of an array
const { 0: apple, [fruits.length - 1]: blueberry } = fruits

// Calculate the index of an item
const { [Math.floor(bikes.length / 2)]: middle } = bikes
```
