// Một nơi duy nhất cấu hình URL, cookie và xử lý lỗi HTTP.
const baseUrl = (import.meta.env.VITE_API_BASE_URL || '/api').replace(/\/$/, '')
export async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers)
  if (options.body && !(options.body instanceof FormData))
    headers.set('Content-Type', 'application/json')
  const response = await fetch(`${baseUrl}${path}`, { ...options, headers, credentials: 'include' })
  if (!response.ok) {
    const body = await response.json().catch(() => null)
    throw new Error(body?.message || `요청에 실패했습니다. (${response.status})`)
  }
  if (response.status === 204)
    return undefined as T
  return response.json() as Promise<T>
}
