const fileExtenstionToTag = {
  js: 'javascript',
  ts: 'typescript',
  css: 'css',
}

export const getTagByFileExtension = (
  fileExtension: keyof typeof fileExtenstionToTag
) => fileExtenstionToTag[fileExtension]
