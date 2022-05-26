export type Snippet = {
  readonly meta: {
    readonly title: string
    readonly publishedAt: string
    readonly fileExtension: 'js' | 'ts' | 'css'
  }
  readonly content: string
}
