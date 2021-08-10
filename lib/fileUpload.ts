export function getFileName(files: File[]) {
  if (!files) return ''
  return encodeURI(files?.[0]?.name)
}

export function makeFileUrl(cid: string, files: File[]) {
  return `https://${cid}.ipfs.dweb.link/${getFileName(files)}`
}