import { TOTAL_COUNT_HEADER } from './config'

export interface PaginatedResponse<T> {
  items: T[]
  totalCount: number
}

export async function request<T>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(url, options)

  if (!response.ok) {
    throw new Error(await response.text())
  }

  return response.json() as Promise<T>
}

export async function requestPaginated<T>(
  url: string,
): Promise<PaginatedResponse<T>> {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(await response.text())
  }

  const totalCount = Number(response.headers.get(TOTAL_COUNT_HEADER) ?? 0)
  const items = (await response.json()) as T[]

  return { items, totalCount }
}

export function createJsonRequest<T>(body: T): RequestInit {
  return {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }
}
