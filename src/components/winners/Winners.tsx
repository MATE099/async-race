import { useEffect } from 'react'

import useWinners from '../../hooks/useWinners'
import {
  setWinnersPage,
  setWinnersSortField,
  setWinnersSortOrder,
} from '../../store/winnersSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import type { WinnerSortField } from '../../types/winner'
import { WINNERS_PER_PAGE } from '../../utils/constants'
import Pagination from '../Pagination'
import WinnersTable from './WinnersTable'

function Winners(): JSX.Element {
  const dispatch = useAppDispatch()
  const { page, sortField, sortOrder } = useAppSelector(
    (state) => state.winners,
  )
  const { winners, total, loading } = useWinners(page, sortField, sortOrder)

  useEffect(() => {
    if (!loading && winners.length === 0 && page > 1) {
      dispatch(setWinnersPage(page - 1))
    }
  }, [dispatch, loading, page, winners.length])

  const handleSortChange = (field: WinnerSortField): void => {
    if (field === sortField) {
      dispatch(setWinnersSortOrder(sortOrder === 'ASC' ? 'DESC' : 'ASC'))
      return
    }
    dispatch(setWinnersSortField(field))
    dispatch(setWinnersSortOrder('DESC'))
  }

  return (
    <section className="page">
      <header className="page__header">
        <h1>Winners ({total})</h1>
      </header>

      {winners.length === 0 && !loading ? (
        <p className="page__empty">
          No winners yet. Run a race in the Garage to record one.
        </p>
      ) : (
        <WinnersTable
          winners={winners}
          page={page}
          pageSize={WINNERS_PER_PAGE}
          sortField={sortField}
          sortOrder={sortOrder}
          onSortChange={handleSortChange}
        />
      )}

      <Pagination
        page={page}
        total={total}
        pageSize={WINNERS_PER_PAGE}
        onPageChange={(next) => dispatch(setWinnersPage(next))}
      />
    </section>
  )
}

export default Winners
