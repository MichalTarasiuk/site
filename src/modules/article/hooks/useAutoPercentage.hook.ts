import { useCallback, useMemo, useState } from 'react'

import { sum } from 'src/common/utils/utils'

const createAutoPercentage = () => {
  let _count = 0

  const percentage = () => {
    _count++

    return {
      [Symbol.toPrimitive]: () => 1 / _count,
    }
  }

  return { percentage }
}

export const useAutoPercentage = (names: readonly string[]) => {
  const [progress, setProgress] = useState(0)

  const autoPercentage = useMemo(() => createAutoPercentage(), [])
  const steps = useMemo(
    () =>
      names.map((name) => ({ name, progress: autoPercentage.percentage() })),
    [names, autoPercentage]
  )

  const updateProgress = useCallback(
    (name: string) => {
      const currentStep = steps.findIndex((step) => step.name === name)
      const completedSteps = steps.slice(0, currentStep + 1)
      const nextProgress = completedSteps
        .map((step) => Number(step.progress))
        .reduce(sum)

      console.log(nextProgress)

      setProgress(nextProgress)
    },
    [steps]
  )

  return { progress, updateProgress }
}
