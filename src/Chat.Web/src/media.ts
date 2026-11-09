// What the server accepts (Attachment in Chat.Domain), checked before the upload so a too long film fails at once.

export const MAX_BYTES = 20 * 1024 * 1024
export const MAX_VIDEO_SECONDS = 30
export const MAX_ATTACHMENTS = 10

export type FileProblem = 'unsupported' | 'tooLarge' | 'tooLong'

export const isVideo = (file: { type: string }) => file.type.startsWith('video/')
export const isImage = (file: { type: string }) => file.type.startsWith('image/')

/** A film's length in seconds, null when the browser cannot read it (the server decides then). */
export function videoSeconds(file: File): Promise<number | null> {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file)
    const video = document.createElement('video')
    const done = (seconds: number | null) => {
      URL.revokeObjectURL(url)
      resolve(seconds)
    }
    video.preload = 'metadata'
    video.onloadedmetadata = () => done(Number.isFinite(video.duration) ? video.duration : null)
    video.onerror = () => done(null)
    video.src = url
  })
}

export async function checkFile(file: File, lengthOf: (file: File) => Promise<number | null> = videoSeconds): Promise<FileProblem | null> {
  if (!isImage(file) && !isVideo(file)) return 'unsupported'
  if (file.size > MAX_BYTES) return 'tooLarge'
  if (isVideo(file)) {
    const seconds = await lengthOf(file)
    // Half a second of slack: containers round the length differently than ffprobe on the server.
    if (seconds !== null && seconds > MAX_VIDEO_SECONDS + 0.5) return 'tooLong'
  }
  return null
}

/** The server's failure codes for an upload, as the same three problems where they match. */
export function problemOf(code: string | null): FileProblem | null {
  switch (code) {
    case 'attachment.too_large':
      return 'tooLarge'
    case 'attachment.too_long':
      return 'tooLong'
    case 'attachment.unsupported':
    case 'attachment.unreadable':
      return 'unsupported'
    default:
      return null
  }
}
