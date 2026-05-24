import { useEffect, useState } from 'react'

import { getCar } from '../api/cars'
import { getWinners } from '../api/winners'
import type { Car } from '../types/car'
import type { SortOrder, Winner, WinnerSortField } from '../types/winner'
import { WINNERS_PER_PAGE } from '../utils/constants'

export interface WinnerRow extends Winner {
  name: string
  color: string
}

interface UseWinnersResult {
  winners: WinnerRow[]
  total: number
  loading: boolean
}

async function joinWinnerWithCar(winner: Winner): Promise<WinnerRow> {
  try {
    const car: Car = await getCar(winner.id)
    return { ...winner, name: car.name, color: car.color }
  } catch {
    return { ...winner, name: 'Unknown car', color: '#94a3b8' }
  }
}

function useWinners(
  page: number,
  sortField: WinnerSortField,
  sortOrder: SortOrder,
): UseWinnersResult {
  const [winners, setWinners] = useState<WinnerRow[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let cancelled = false
    setLoading(true)

    getWinners({
      page,
      limit: WINNERS_PER_PAGE,
      sort: sortField,
      order: sortOrder,
    })
      .then(async ({ items, totalCount }) => {
        const joined = await Promise.all(items.map(joinWinnerWithCar))
        if (cancelled) return
        setWinners(joined)
        setTotal(totalCount)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [page, sortField, sortOrder])

  return { winners, total, loading }
}

export default useWinners
