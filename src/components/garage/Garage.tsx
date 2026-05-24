import { useEffect } from 'react'

import useGarage from '../../hooks/useGarage'
import { setGaragePage } from '../../store/garageSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { CARS_PER_PAGE } from '../../utils/constants'
import Pagination from '../Pagination'
import CarForm from './CarForm'
import CarItem from './CarItem'
import RaceControls from './RaceControls'
import WinnerBanner from './WinnerBanner'

function Garage(): JSX.Element {
  const dispatch = useAppDispatch()
  const page = useAppSelector((state) => state.garage.page)
  const { cars, total, loading, refresh } = useGarage(page)

  useEffect(() => {
    if (!loading && cars.length === 0 && page > 1) {
      dispatch(setGaragePage(page - 1))
    }
  }, [cars.length, dispatch, loading, page])

  return (
    <section className="page">
      <header className="page__header">
        <h1>Garage ({total})</h1>
      </header>

      <RaceControls cars={cars} onChange={refresh} />
      <CarForm cars={cars} onChange={refresh} />

      {cars.length === 0 && !loading ? (
        <p className="page__empty">No cars in the garage yet.</p>
      ) : (
        <ul className="car-list">
          {cars.map((car) => (
            <li key={car.id}>
              <CarItem car={car} onChange={refresh} />
            </li>
          ))}
        </ul>
      )}

      <Pagination
        page={page}
        total={total}
        pageSize={CARS_PER_PAGE}
        onPageChange={(next) => dispatch(setGaragePage(next))}
      />

      <WinnerBanner />
    </section>
  )
}

export default Garage
