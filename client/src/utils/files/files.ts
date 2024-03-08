import { DocumentQuery } from 'graphql/v2/generated/graphql'

export const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            // Use a regex to remove data url part
            const base64String = (reader.result as string).replace('data:', '').replace(/^.+,/, '')
            resolve(base64String)
        }
        reader.onerror = error => reject(error)
    })

const base64ToDataURL = (mimeType: string, base64: string): string => {
    return `data:${mimeType};base64,${base64}`
}

export function downloadFile(file: DocumentQuery['document']['file']) {
    const linkSource = base64ToDataURL(file.mimeType, file.base64)
    const downloadLink = document.createElement('a')

    downloadLink.href = linkSource
    downloadLink.download = file.name
    downloadLink.click()
    downloadLink.remove()
}
