import { driveEngine, startEngine, stopEngine } from '../api/engine'
import { createWinner, getWinner, updateWinner } from '../api/winners'
import {
  clearCarRaceState,
  resetRace,
  setCarRaceState,
  setRaceActive,
  setWinner,
  type RaceWinner,
} from '../store/raceSlice'
import type { AppDispatch } from '../store/store'
import type { Car } from '../types/car'
import { MS_PER_SECOND, TIME_PRECISION } from '../utils/constants'

function toSeconds(durationMs: number): number {
  return Number((durationMs / MS_PER_SECOND).toFixed(TIME_PRECISION))
}

export async function raceSingleCar(
  car: Car,
  dispatch: AppDispatch,
): Promise<RaceWinner> {
  dispatch(setCarRaceState({ id: car.id, status: 'starting', duration: 0 }))
  const { velocity, distance } = await startEngine(car.id)
  const duration = distance / velocity
  dispatch(setCarRaceState({ id: car.id, status: 'driving', duration }))

  try {
    await driveEngine(car.id)
    dispatch(setCarRaceState({ id: car.id, status: 'finished', duration }))
    return { id: car.id, name: car.name, time: toSeconds(duration) }
  } catch (error) {
    dispatch(setCarRaceState({ id: car.id, status: 'broken', duration }))
    throw error
  }
}

export async function stopSingleCar(
  carId: number,
  dispatch: AppDispatch,
): Promise<void> {
  try {
    await stopEngine(carId)
  } finally {
    dispatch(clearCarRaceState(carId))
  }
}

async function saveWinnerRecord(winner: RaceWinner): Promise<void> {
  try {
    const existing = await getWinner(winner.id)
    await updateWinner(winner.id, {
      wins: existing.wins + 1,
      time: Math.min(existing.time, winner.time),
    })
  } catch {
    await createWinner({ id: winner.id, wins: 1, time: winner.time })
  }
}

export async function startRace(
  cars: Car[],
  dispatch: AppDispatch,
): Promise<void> {
  if (cars.length === 0) {
    return
  }

  dispatch(setRaceActive(true))
  const racePromises = cars.map((car) => raceSingleCar(car, dispatch))

  try {
    const winner = await Promise.any(racePromises)
    dispatch(setWinner(winner))
    await saveWinnerRecord(winner)
  } catch {
    dispatch(setWinner(null))
  }
}

export async function resetAllCars(
  cars: Car[],
  dispatch: AppDispatch,
): Promise<void> {
  await Promise.allSettled(cars.map((car) => stopSingleCar(car.id, dispatch)))
  dispatch(resetRace())
}
