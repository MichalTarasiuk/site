import { useCallback, useMemo } from 'react'

import { useProgress } from 'src/app/contexts/contexts'
import { sum } from 'src/common/utils/utils'

const createAutoPercentage = () => {
  let _count = 0

  const percentage = () => {
    _count++

    return {
      [Symbol.toPrimitive]: () => 100 / _count,
    }
  }

  return { percentage }
}

const MAX_PROGRESS = 100

export const useAutoPercentage = (names: readonly string[]) => {
  const { setPercentage } = useProgress()

  const autoPercentage = useMemo(() => createAutoPercentage(), [])
  const steps = useMemo(
    () =>
      names.map((name) => ({ name, progress: autoPercentage.percentage() })),
    [names, autoPercentage]
  )

  const updateProgress = useCallback(
    (name: string) => {
      const currentIndexStep = steps.findIndex((step) => step.name === name)
      const completedSteps = steps.slice(0, currentIndexStep + 1)

      const progress = completedSteps
        .map((step) => Number(step.progress))
        .reduce(sum)
      const percentage = Math.min(MAX_PROGRESS, progress) / 100

      setPercentage(percentage)
    },
    [steps, setPercentage]
  )

  console.log()

  return { updateProgress }
}
