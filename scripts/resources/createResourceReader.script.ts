import Fs from 'fs'
import Path from 'path'

import Matter from 'gray-matter'

type ResourceName = 'snippets'

const rootPath = process.cwd()

const MDX_PATTERN = /\.mdx?$/

export const createResourceReader = <TType extends PlainObject>(
  resourceName: ResourceName
) => {
  const resourcePath = Path.join(rootPath, `resources`, resourceName)

  const readDir = (path: string) => {
    const files = Fs.readdirSync(path).filter((file) => MDX_PATTERN.test(file))

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

    return resources as unknown as readonly TType[]
  }

  const getResource = (name: string) => {
    const filePath = Path.join(resourcePath, `${name}.md`)
    const fileContent = Fs.readFileSync(filePath, 'utf8')

    const { content, data: meta } = Matter(fileContent)

    return { content, meta } as unknown as TType
  }

  return { getAllResources, getResource }
}
