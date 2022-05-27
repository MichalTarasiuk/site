---
title: 'image set'
publishedAt: '10-05-2022'
fileExtension: 'css'
---

```css
.box {
  background-image: url('large-balloons.jpg');
  background-image: image-set(
    url('large-balloons.avif') type('image/avif'),
    url('large-balloons.jpg') type('image/jpeg')
  );
}
```
