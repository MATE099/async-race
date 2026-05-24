export interface Winner {
  id: number
  wins: number
  time: number
}

export type WinnerCreateRequest = Winner

export type WinnerUpdateRequest = Omit<Winner, 'id'>

export type WinnerSortField = 'id' | 'wins' | 'time'

export type SortOrder = 'ASC' | 'DESC'
