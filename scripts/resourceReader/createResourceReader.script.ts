import Fs from 'fs'
import Path from 'path'

import Matter from 'gray-matter'

import type { ResourceName, Resources } from './resources.types'

type Reader<TType extends PlainObject> = {
  readonly getAllResources: () => readonly TType[]
  readonly getResource: (name: string) => TType
}

const rootPath = process.cwd()
const MDX_PATTERN = /\.mdx?$/

export const createResourceReader = (() => {
  const resourceReaders = new Map<string, PlainObject>()

  return <
    TResourceName extends ResourceName,
    TResource extends Resources[TResourceName],
    TReader extends Reader<TResource>
  >(
    resourceName: TResourceName
  ) => {
    if (resourceReaders.has(resourceName)) {
      return resourceReaders.get(resourceName) as TReader
    }

    const resourcePath = Path.join(rootPath, `resources`, resourceName)

    const readDir = (path: string) => {
      const files = Fs.readdirSync(path).filter((file) =>
        MDX_PATTERN.test(file)
      )

      return files
    }

    const getAllResources = () => {
      const files = readDir(resourcePath)

      const resources = files.map((file) => {
        const filePath = Path.join(resourcePath, file)
        const fileContent = Fs.readFileSync(filePath, 'utf8')

        const { content, data: meta } = Matter(fileContent)

        return { content, meta }
      })
      return resources as unknown as readonly TResource[]
    }

    const getResource = (name: string) => {
      const filePath = Path.join(resourcePath, `${name}.md`)
      const fileContent = Fs.readFileSync(filePath, 'utf8')

      const { content, data: meta } = Matter(fileContent)

      return { content, meta } as unknown as TResource
    }

    const reader = {
      getAllResources,
      getResource,
    }

    resourceReaders.set(resourceName, reader)

    return { getAllResources, getResource }
  }
})()
