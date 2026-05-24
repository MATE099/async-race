import { createCar } from '../../api/cars'
import { resetAllCars, startRace } from '../../services/raceService'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import type { Car } from '../../types/car'
import { RANDOM_CARS_BATCH } from '../../utils/constants'
import { generateRandomCars } from '../../utils/randomCar'

interface RaceControlsProps {
  cars: Car[]
  onChange: () => void
}

function RaceControls({ cars, onChange }: RaceControlsProps): JSX.Element {
  const dispatch = useAppDispatch()
  const isRaceActive = useAppSelector((state) => state.race.isRaceActive)

  const handleStartRace = async (): Promise<void> => {
    await startRace(cars, dispatch)
  }

  const handleResetRace = async (): Promise<void> => {
    await resetAllCars(cars, dispatch)
  }

  const handleGenerate = async (): Promise<void> => {
    const newCars = generateRandomCars(RANDOM_CARS_BATCH)
    await Promise.all(newCars.map((car) => createCar(car)))
    onChange()
  }

  return (
    <div className="race-controls">
      <button type="button" onClick={handleStartRace} disabled={isRaceActive}>
        Race
      </button>
      <button type="button" onClick={handleResetRace}>
        Reset
      </button>
      <button type="button" onClick={handleGenerate} disabled={isRaceActive}>
        Generate {RANDOM_CARS_BATCH} cars
      </button>
    </div>
  )
}

export default RaceControls
