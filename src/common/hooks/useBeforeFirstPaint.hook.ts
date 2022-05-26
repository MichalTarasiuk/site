import { useLayoutEffect } from 'react'

import type { EffectCallback } from 'react'

export const useBeforeFirstPaint = (effect: EffectCallback) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps -- should call only once
  useLayoutEffect(effect, [])
}
