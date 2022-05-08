const FALLBACK_MESSAGE = 'Something went wrong. Please try again later.'

const setRequestInit = (requestInit: RequestInit) => {
  const { body, headers, ...restOfRequestInit } = requestInit

  return {
    ...restOfRequestInit,
    ...(body && { body: JSON.stringify(body) }),
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
  }
}

export const fetcher = async (input: RequestInfo, init?: RequestInit) => {
  try {
    const response = await fetch(input, init && setRequestInit(init))

    if (response.ok) {
      return response.json()
    }

    throw new ResponseError(response.statusText, response.status)
  } catch (error) {
    if (error instanceof ResponseError) {
      throw error
    }

    throw new ResponseError(FALLBACK_MESSAGE)
  }
}

export class ResponseError extends Error {
  constructor(message: string, public readonly status?: number) {
    super(message)
    // eslint-disable-next-line functional/no-this-expression -- required for extending error
    this.name = 'ResponseError'
    // eslint-disable-next-line functional/no-this-expression -- required for extending error
    Object.setPrototypeOf(this, ResponseError.prototype)
  }
}
