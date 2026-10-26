// Chỉ mock service sử dụng localStorage. Không lưu mật khẩu.
export function readStored<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) as T : fallback
  }
  catch {
    return fallback
  }
}
export function writeStored<T>(key: string, value: T): T {
  localStorage.setItem(key, JSON.stringify(value))
  return value
}
