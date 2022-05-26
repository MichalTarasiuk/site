export type Snippet = {
  readonly meta: {
    readonly title: string
    readonly publishedAt: string
    readonly fileEextension: 'js' | 'ts' | 'css'
  }
  readonly content: string
}
