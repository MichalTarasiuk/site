---
title: 'array-prototype-at'
publishedAt: '10-05-2022'
fileEextension: 'js'
---

```js
const fruits = ['Apple 🍏', 'Banana 🍌', 'Strawberry 🍓', 'Blueberry 🫐'];

// Wybieranie po indexie

✅ fruits.at(0); // Apple 🍏

✅ fruits.at(3); // Blueberry 🫐

// Przedostatni element

❌ fruits[fruits.length - 2]; // Strawberry 🍓

❌ fruits.slice(-2, -1)[0]; // Strawberry 🍓

✅ fruits.at(-2); // Strawberry 🍓
```
