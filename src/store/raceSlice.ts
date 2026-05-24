import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type CarRaceStatus =
  | 'idle'
  | 'starting'
  | 'driving'
  | 'broken'
  | 'finished'

export interface CarRaceState {
  status: CarRaceStatus
  duration: number
}

export interface RaceWinner {
  id: number
  name: string
  time: number
}

interface RaceState {
  cars: Record<number, CarRaceState>
  isRaceActive: boolean
  winner: RaceWinner | null
}

const initialState: RaceState = {
  cars: {},
  isRaceActive: false,
  winner: null,
}

interface SetCarStatePayload {
  id: number
  status: CarRaceStatus
  duration: number
}

const raceSlice = createSlice({
  name: 'race',
  initialState,
  reducers: {
    setCarRaceState(state, action: PayloadAction<SetCarStatePayload>) {
      const { id, status, duration } = action.payload
      const nextCars = { ...state.cars, [id]: { status, duration } }
      return { ...state, cars: nextCars }
    },
    clearCarRaceState(state, action: PayloadAction<number>) {
      const nextCars = { ...state.cars }
      delete nextCars[action.payload]
      return { ...state, cars: nextCars }
    },
    setRaceActive(state, action: PayloadAction<boolean>) {
      return { ...state, isRaceActive: action.payload }
    },
    setWinner(state, action: PayloadAction<RaceWinner | null>) {
      return { ...state, winner: action.payload }
    },
    resetRace() {
      return initialState
    },
  },
})

export const {
  setCarRaceState,
  clearCarRaceState,
  setRaceActive,
  setWinner,
  resetRace,
} = raceSlice.actions

export default raceSlice.reducer
