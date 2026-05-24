import { useEffect, useRef } from 'react'

import { deleteCar } from '../../api/cars'
import { deleteWinner } from '../../api/winners'
import { raceSingleCar, stopSingleCar } from '../../services/raceService'
import { setSelectedCarId } from '../../store/garageSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import type { Car } from '../../types/car'
import { CAR_ICON_WIDTH_PX } from '../../utils/constants'
import CarIcon from './CarIcon'

interface CarItemProps {
  car: Car
  onChange: () => void
}

const FINISH_TRANSFORM = `translateX(calc(100% - ${CAR_ICON_WIDTH_PX}px))`

function startDrivingAnimation(
  element: HTMLDivElement,
  duration: number,
): void {
  element.style.transition = 'none'
  element.style.transform = 'translateX(0)'
  requestAnimationFrame(() => {
    element.style.transition = `transform ${duration}ms linear`
    element.style.transform = FINISH_TRANSFORM
  })
}

function freezeCar(element: HTMLDivElement): void {
  const current = window.getComputedStyle(element).transform
  element.style.transition = 'none'
  element.style.transform = current === 'none' ? 'translateX(0)' : current
}

function applyCarTransform(
  element: HTMLDivElement | null,
  status: string,
  duration: number,
): void {
  if (!element) return
  if (status === 'driving') {
    startDrivingAnimation(element, duration)
    return
  }
  if (status === 'broken') {
    freezeCar(element)
    return
  }
  element.style.transition = 'none'
  element.style.transform =
    status === 'finished' ? FINISH_TRANSFORM : 'translateX(0)'
}

function CarItem({ car, onChange }: CarItemProps): JSX.Element {
  const dispatch = useAppDispatch()
  const carState = useAppSelector((state) => state.race.cars[car.id])
  const status = carState?.status ?? 'idle'
  const duration = carState?.duration ?? 0
  const runnerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    applyCarTransform(runnerRef.current, status, duration)
  }, [status, duration])

  const isAtStart = status === 'idle'

  const handleSelect = (): void => {
    dispatch(setSelectedCarId(car.id))
  }

  const handleRemove = async (): Promise<void> => {
    await deleteCar(car.id)
    await deleteWinner(car.id).catch(() => {})
    onChange()
  }

  const handleStartEngine = async (): Promise<void> => {
    try {
      await raceSingleCar(car, dispatch)
    } catch {
      // broken engine - state already updated
    }
  }

  const handleStopEngine = async (): Promise<void> => {
    await stopSingleCar(car.id, dispatch)
  }

  return (
    <div className="car-item">
      <div className="car-item__controls">
        <button type="button" onClick={handleSelect}>
          Select
        </button>
        <button type="button" onClick={handleRemove}>
          Remove
        </button>
        <button type="button" onClick={handleStartEngine} disabled={!isAtStart}>
          A
        </button>
        <button type="button" onClick={handleStopEngine} disabled={isAtStart}>
          B
        </button>
        <span className="car-item__name">{car.name}</span>
      </div>
      <div className="car-track">
        <div className="car-runner" ref={runnerRef}>
          <CarIcon color={car.color} />
        </div>
        <span className="car-flag" aria-hidden="true">
          F
        </span>
      </div>
    </div>
  )
}

export default CarItem
