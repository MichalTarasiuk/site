---
title: 'class keys'
publishedAt: '29-06-2022'
fileExtension: 'ts'
---

```ts
class RandomClass {
  public str: string
  protected num: number
  private bool: boolean
  
  constructor() {
    this.str = 'naive'
    this.num = 19260917
    this.bool = true
  }

  getNum() {
    return Math.random()
  }
}

// public 
type testPublic = 'str' extends keyof RandomClass ? true : false

// protected
type testProtected = 'num' extends keyof RandomClass ? true : false

// private 
type testPrivate = 'bool' extends keyof RandomClass ? true : false
```
