import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface GarageState {
  page: number
  createName: string
  createColor: string
  editName: string
  editColor: string
  selectedCarId: number | null
}

const initialState: GarageState = {
  page: 1,
  createName: '',
  createColor: '#ffffff',
  editName: '',
  editColor: '#ffffff',
  selectedCarId: null,
}

const garageSlice = createSlice({
  name: 'garage',
  initialState,
  reducers: {
    setGaragePage(state, action: PayloadAction<number>) {
      return { ...state, page: action.payload }
    },
    setCreateName(state, action: PayloadAction<string>) {
      return { ...state, createName: action.payload }
    },
    setCreateColor(state, action: PayloadAction<string>) {
      return { ...state, createColor: action.payload }
    },
    setEditName(state, action: PayloadAction<string>) {
      return { ...state, editName: action.payload }
    },
    setEditColor(state, action: PayloadAction<string>) {
      return { ...state, editColor: action.payload }
    },
    setSelectedCarId(state, action: PayloadAction<number | null>) {
      return { ...state, selectedCarId: action.payload }
    },
  },
})

export const {
  setGaragePage,
  setCreateName,
  setCreateColor,
  setEditName,
  setEditColor,
  setSelectedCarId,
} = garageSlice.actions

export default garageSlice.reducer
