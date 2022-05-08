/* eslint-disable react-hooks/exhaustive-deps -- invoke effect callback only on mount */
import { useEffect } from 'react'

import type { EffectCallback } from 'react'

export const useUnMount = (effectCallback: ReturnType<EffectCallback>) => {
  useEffect(() => effectCallback, [])
}
