import { accessTokenLocalstorageKey } from 'components/Providers/SessionProvider/constants'
import { env } from '../env'

export async function downloadFile(
    path: string,
    params: Record<string, string> = {},
    fileName: string,
    slug: string = ''
) {
    const fetchUrl = new URL(`${env.apiBasePath}${path}`)
    Object.entries(params).forEach(([k, v]) => fetchUrl.searchParams.set(k, v))
    const headers = {
        Authorization: `Bearer ${localStorage.getItem(accessTokenLocalstorageKey)}`,
        'organization-slug': slug,
    }

    const res = await fetch(fetchUrl, { headers })
    if (res.status !== 200) {
        throw new Error(res.statusText)
    }

    const blob = await res.blob()
    const downloadUrl = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = downloadUrl
    a.download = fileName

    a.click()
    window.URL.revokeObjectURL(downloadUrl)
    a.remove()
}
