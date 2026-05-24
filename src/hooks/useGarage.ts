import { useCallback, useEffect, useState } from 'react'

import { getCars } from '../api/cars'
import type { Car } from '../types/car'
import { CARS_PER_PAGE } from '../utils/constants'

interface UseGarageResult {
  cars: Car[]
  total: number
  loading: boolean
  refresh: () => void
}

function useGarage(page: number): UseGarageResult {
  const [cars, setCars] = useState<Car[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  const refresh = useCallback(() => {
    setRefreshKey((value) => value + 1)
  }, [])

  useEffect(() => {
    let cancelled = false
    setLoading(true)

    getCars(page, CARS_PER_PAGE)
      .then((response) => {
        if (cancelled) {
          return
        }
        setCars(response.items)
        setTotal(response.totalCount)
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [page, refreshKey])

  return { cars, total, loading, refresh }
}

export default useGarage
