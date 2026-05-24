import type { Car, CarCreateRequest, CarUpdateRequest } from '../types/car'
import { API_BASE_URL } from './config'
import { createJsonRequest, request, requestPaginated } from './request'

const GARAGE_URL = `${API_BASE_URL}/garage`

export function getCars(page: number, limit: number) {
  const params = new URLSearchParams({
    _page: String(page),
    _limit: String(limit),
  })

  return requestPaginated<Car>(`${GARAGE_URL}?${params.toString()}`)
}

export function getCar(id: number) {
  return request<Car>(`${GARAGE_URL}/${id}`)
}

export function createCar(car: CarCreateRequest) {
  return request<Car>(GARAGE_URL, {
    method: 'POST',
    ...createJsonRequest(car),
  })
}

export function updateCar(id: number, car: CarUpdateRequest) {
  return request<Car>(`${GARAGE_URL}/${id}`, {
    method: 'PUT',
    ...createJsonRequest(car),
  })
}

export async function deleteCar(id: number): Promise<void> {
  await request<Record<string, never>>(`${GARAGE_URL}/${id}`, {
    method: 'DELETE',
  })
}
