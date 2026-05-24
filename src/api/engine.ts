import type {
  EngineDriveResponse,
  EngineStartResponse,
  EngineStatus,
} from '../types/engine'
import { API_BASE_URL } from './config'
import { request } from './request'

const ENGINE_URL = `${API_BASE_URL}/engine`

function createEngineUrl(id: number, status: EngineStatus): string {
  const params = new URLSearchParams({
    id: String(id),
    status,
  })

  return `${ENGINE_URL}?${params.toString()}`
}

export function startEngine(id: number) {
  return request<EngineStartResponse>(createEngineUrl(id, 'started'), {
    method: 'PATCH',
  })
}

export function stopEngine(id: number) {
  return request<EngineStartResponse>(createEngineUrl(id, 'stopped'), {
    method: 'PATCH',
  })
}

export function driveEngine(id: number) {
  return request<EngineDriveResponse>(createEngineUrl(id, 'drive'), {
    method: 'PATCH',
  })
}
