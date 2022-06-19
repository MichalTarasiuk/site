export type ParsedXml = {
  readonly rss: RSS
}

export type ItemRSS = {
  readonly title: string
  readonly description: string
  readonly link: string
  readonly guid: string
  readonly pubDate: string
  readonly 'content:encoded': string
}

export type RSS = {
  readonly channel: {
    readonly title: string
    readonly description: string
    readonly link: string
    readonly generator: string
    readonly lastBuildDate: string
    readonly item: readonly ItemRSS[]
  }
}

export type FormatedChannel = AddKey<
  RenameKey<RSS['channel'], 'item', 'items'>,
  'slug',
  string
>
