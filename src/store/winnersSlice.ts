import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type { SortOrder, WinnerSortField } from '../types/winner'

interface WinnersState {
  page: number
  sortField: WinnerSortField
  sortOrder: SortOrder
}

const initialState: WinnersState = {
  page: 1,
  sortField: 'wins',
  sortOrder: 'DESC',
}

const winnersSlice = createSlice({
  name: 'winners',
  initialState,
  reducers: {
    setWinnersPage(state, action: PayloadAction<number>) {
      return { ...state, page: action.payload }
    },
    setWinnersSortField(state, action: PayloadAction<WinnerSortField>) {
      return { ...state, sortField: action.payload }
    },
    setWinnersSortOrder(state, action: PayloadAction<SortOrder>) {
      return { ...state, sortOrder: action.payload }
    },
  },
})

export const { setWinnersPage, setWinnersSortField, setWinnersSortOrder } =
  winnersSlice.actions

export default winnersSlice.reducer
