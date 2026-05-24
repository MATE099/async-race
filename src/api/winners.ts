import type {
  SortOrder,
  Winner,
  WinnerCreateRequest,
  WinnerSortField,
  WinnerUpdateRequest,
} from '../types/winner'
import { API_BASE_URL } from './config'
import { createJsonRequest, request, requestPaginated } from './request'

const WINNERS_URL = `${API_BASE_URL}/winners`

interface GetWinnersParams {
  page: number
  limit: number
  sort?: WinnerSortField
  order?: SortOrder
}

export function getWinners({ page, limit, sort, order }: GetWinnersParams) {
  const params = new URLSearchParams({
    _page: String(page),
    _limit: String(limit),
  })

  if (sort && order) {
    params.set('_sort', sort)
    params.set('_order', order)
  }

  return requestPaginated<Winner>(`${WINNERS_URL}?${params.toString()}`)
}

export function getWinner(id: number) {
  return request<Winner>(`${WINNERS_URL}/${id}`)
}

export function createWinner(winner: WinnerCreateRequest) {
  return request<Winner>(WINNERS_URL, {
    method: 'POST',
    ...createJsonRequest(winner),
  })
}

export function updateWinner(id: number, winner: WinnerUpdateRequest) {
  return request<Winner>(`${WINNERS_URL}/${id}`, {
    method: 'PUT',
    ...createJsonRequest(winner),
  })
}

export async function deleteWinner(id: number): Promise<void> {
  await request<Record<string, never>>(`${WINNERS_URL}/${id}`, {
    method: 'DELETE',
  })
}
