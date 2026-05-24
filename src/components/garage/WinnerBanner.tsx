import { setWinner } from '../../store/raceSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'

function WinnerBanner(): JSX.Element | null {
  const dispatch = useAppDispatch()
  const winner = useAppSelector((state) => state.race.winner)

  if (!winner) {
    return null
  }

  const handleClose = (): void => {
    dispatch(setWinner(null))
  }

  return (
    <div className="winner-banner" role="dialog" aria-modal="true">
      <div className="winner-banner__card">
        <h2>Winner</h2>
        <p>
          {winner.name} finished in {winner.time}s
        </p>
        <button type="button" onClick={handleClose}>
          Close
        </button>
      </div>
    </div>
  )
}

export default WinnerBanner
