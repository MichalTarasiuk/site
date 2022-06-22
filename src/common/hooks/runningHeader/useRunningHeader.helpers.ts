export const observerInit = {
  threshold: 1,
}

export const getHighestElement = (elements: readonly HTMLElement[]) =>
  elements.reduce<HTMLElement | null>((collector, htmlElement) => {
    if (!collector) {
      return htmlElement
    }

    const isHigher = !(
      collector.compareDocumentPosition(htmlElement) &
      Node.DOCUMENT_POSITION_FOLLOWING
    )

    if (isHigher) {
      return htmlElement
    }

    return collector
  }, null)
