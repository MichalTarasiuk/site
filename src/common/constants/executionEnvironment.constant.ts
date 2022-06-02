const canUseDOM = !!(
  typeof window !== 'undefined' &&
  typeof window.document !== 'undefined' &&
  typeof window.document.createElement !== 'undefined'
)

export const isServerEnvironment = !canUseDOM
export const isClientEnvironment = canUseDOM
