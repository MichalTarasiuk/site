import type { ReactElement } from 'react'

import { spacer } from 'src/common/constants/constants'
import { castArray, isString, hasKey } from 'src/common/utils/utils'

type SectionElement = ReactElement<{
  readonly id: string
  readonly children: readonly JSX.Element[]
}>

const isJSXElement = (element: string | JSX.Element): element is JSX.Element =>
  !isString(element)

const isSectionElement = (
  jsxElement: JSX.Element
): jsxElement is SectionElement =>
  hasKey(jsxElement.props, 'id') && hasKey(jsxElement.props, 'children')

export const getSections = (
  jsx: string | JSX.Element | readonly JSX.Element[]
) => {
  const sectionsProps = castArray(jsx)
    .filter(isJSXElement)
    .filter(isSectionElement)
    .map((sectionElement) => sectionElement.props)

  const sections = sectionsProps.map((sectionProps) => ({
    text: sectionProps.children.filter(isString).join(spacer),
    id: sectionProps.id,
  }))

  return sections
}
