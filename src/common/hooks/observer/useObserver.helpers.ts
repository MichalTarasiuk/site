/* eslint-disable functional/prefer-readonly-type -- required functionality */
export type ObserverInit = Pick<
  IntersectionObserverInit,
  'rootMargin' | 'threshold'
>

type ObserverCallback = (entry: IntersectionObserverEntry) => void

type ObserverData = {
  readonly name: string
  readonly observer: IntersectionObserver
  readonly elementToCallback: Map<Element, ObserverCallback>
}

export const createObserver = () => {
  const observers = new Map<string, ObserverData>()

  const createObserver = (observerInit?: ObserverInit) => {
    const name = JSON.stringify(observerInit)

    if (observers.has(name)) {
      return observers.get(name)!
    }

    const elementToCallback = new Map<Element, ObserverCallback>()
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const callback = elementToCallback.get(entry.target)

        if (callback) {
          callback(entry)
        }
      })
    }, observerInit)

    const observerData = {
      name,
      observer,
      elementToCallback,
    }

    observers.set(name, observerData)

    return observerData
  }

  const observe = (
    element: Element,
    observerCallback: ObserverCallback,
    observerInit: ObserverInit
  ) => {
    const { name, observer, elementToCallback } = createObserver(observerInit)

    elementToCallback.set(element, observerCallback)
    observer.observe(element)

    return () => {
      observer.unobserve(element)
      elementToCallback.delete(element)

      if (elementToCallback.size === 0) {
        observer.disconnect()
        observers.delete(name)
      }
    }
  }

  return { observe }
}
