---
title: 'auto percentage'
publishedAt: '4-07-2022'
fileExtension: 'ts'
---

```ts
const createAutoPercentage = () => {
  let _count = 0;

  const percentage = () => {
    _count++;

    return {
      [Symbol.toPrimitive]: () => 1 / _count,
    };
  };

  const count = () => {
    _count++;

    return {
      [Symbol.toPrimitive]: () => _count,
    };
  };

  return { count, percentage };
};

const autoPercentage = createAutoPercentage();

const steps = [
  { name: 'init', progress: autoPercentage.percentage() },
  { name: 'modify', progress: autoPercentage.percentage() },
  { name: 'verify', progress: autoPercentage.percentage() },
  { name: 'cleanup', progress: 0 },
];

let progress = 0;

for (const step of steps) {
  if (progress === 1) {
    break;
  }

  progress += Number(step.progress);

  console.log(
    `${step.name} finished - job is ${Math.round(progress * 100)}% complete`
  );
}
```
