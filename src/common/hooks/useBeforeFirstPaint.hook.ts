import { useLayoutEffect, useEffect } from 'react'

import type { EffectCallback } from 'react'

import { isClientEnvironment } from 'src/common/constants/constants'

const useIsomorphicEffect = isClientEnvironment ? useLayoutEffect : useEffect

export const useBeforeFirstPaint = (effect: EffectCallback) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps -- should call only once
  useIsomorphicEffect(effect, [])
}
