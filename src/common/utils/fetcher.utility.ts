const FALLBACK_MESSAGE = 'Something went wrong. Please try again later.'

const setRequestInit = ({ body, headers, ...requestInit }: RequestInit) => ({
  ...requestInit,
  ...(body && { body: JSON.stringify(body) }),
  ...(headers && { headers: { 'Content-type': 'application/json' } }),
})

export const fetcher = async (input: RequestInfo, init?: RequestInit) => {
  try {
    const response = await fetch(input, setRequestInit(init || {}))

    if (response.ok) {
      return response
    }

    throw new ResponseError(response.statusText, response.status)
  } catch (error) {
    if (error instanceof ResponseError) {
      throw error
    }

    throw new ResponseError(FALLBACK_MESSAGE, 400)
  }
}

export class ResponseError extends Error {
  constructor(message: string, public readonly status: number) {
    super(message)
    // eslint-disable-next-line functional/no-this-expression -- required for extending error
    this.name = 'ResponseError'
    // eslint-disable-next-line functional/no-this-expression -- required for extending error
    Object.setPrototypeOf(this, ResponseError.prototype)
  }
}
