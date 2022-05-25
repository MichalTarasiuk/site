import { createResourceReader } from './createResourceReader.script'

import type { Snippet } from './resources.types'

export const snippetsReader = createResourceReader<Snippet>('snippets')
