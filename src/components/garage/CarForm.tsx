import { useEffect } from 'react'

import { createCar, updateCar } from '../../api/cars'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
  setCreateColor,
  setCreateName,
  setEditColor,
  setEditName,
  setSelectedCarId,
} from '../../store/garageSlice'
import type { Car } from '../../types/car'
import { DEFAULT_CAR_COLOR } from '../../utils/constants'

interface CarFormProps {
  cars: Car[]
  onChange: () => void
}

function CarForm({ cars, onChange }: CarFormProps): JSX.Element {
  const dispatch = useAppDispatch()
  const garage = useAppSelector((state) => state.garage)
  const selectedCar =
    cars.find((car) => car.id === garage.selectedCarId) ?? null

  useEffect(() => {
    if (selectedCar) {
      dispatch(setEditName(selectedCar.name))
      dispatch(setEditColor(selectedCar.color))
    }
  }, [dispatch, selectedCar])

  const handleCreate = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault()
    const name = garage.createName.trim()
    if (!name) {
      return
    }

    await createCar({ name, color: garage.createColor })
    dispatch(setCreateName(''))
    dispatch(setCreateColor(DEFAULT_CAR_COLOR))
    onChange()
  }

  const handleUpdate = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault()
    if (!selectedCar) {
      return
    }
    const name = garage.editName.trim()
    if (!name) {
      return
    }

    await updateCar(selectedCar.id, { name, color: garage.editColor })
    dispatch(setSelectedCarId(null))
    dispatch(setEditName(''))
    dispatch(setEditColor(DEFAULT_CAR_COLOR))
    onChange()
  }

  return (
    <div className="car-form">
      <form className="car-form__row" onSubmit={handleCreate}>
        <input
          type="text"
          placeholder="New car name"
          value={garage.createName}
          onChange={(event) => dispatch(setCreateName(event.target.value))}
          maxLength={40}
        />
        <input
          type="color"
          aria-label="Pick color for new car"
          title="Pick color for new car"
          value={garage.createColor}
          onChange={(event) => dispatch(setCreateColor(event.target.value))}
        />
        <button type="submit">Create</button>
      </form>

      <form className="car-form__row" onSubmit={handleUpdate}>
        <input
          type="text"
          placeholder="Update name"
          value={garage.editName}
          onChange={(event) => dispatch(setEditName(event.target.value))}
          disabled={!selectedCar}
          maxLength={40}
        />
        <input
          type="color"
          aria-label="Pick color for selected car"
          title="Pick color for selected car"
          value={garage.editColor}
          onChange={(event) => dispatch(setEditColor(event.target.value))}
          disabled={!selectedCar}
        />
        <button type="submit" disabled={!selectedCar}>
          Update
        </button>
      </form>
    </div>
  )
}

export default CarForm
