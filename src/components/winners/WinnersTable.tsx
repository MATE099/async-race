import type { WinnerRow } from '../../hooks/useWinners'
import type { SortOrder, WinnerSortField } from '../../types/winner'
import CarIcon from '../garage/CarIcon'

interface WinnersTableProps {
  winners: WinnerRow[]
  page: number
  pageSize: number
  sortField: WinnerSortField
  sortOrder: SortOrder
  onSortChange: (field: WinnerSortField) => void
}

function sortIndicator(
  field: WinnerSortField,
  active: WinnerSortField,
  order: SortOrder,
): string {
  if (field !== active) return ''
  return order === 'ASC' ? ' \u25B2' : ' \u25BC'
}

function WinnersTable({
  winners,
  page,
  pageSize,
  sortField,
  sortOrder,
  onSortChange,
}: WinnersTableProps): JSX.Element {
  return (
    <table className="winners-table">
      <thead>
        <tr>
          <th className="winners-table__num">#</th>
          <th className="winners-table__icon">Car</th>
          <th>Name</th>
          <th>
            <button
              type="button"
              className="winners-table__sort"
              onClick={() => onSortChange('wins')}
            >
              Wins{sortIndicator('wins', sortField, sortOrder)}
            </button>
          </th>
          <th>
            <button
              type="button"
              className="winners-table__sort"
              onClick={() => onSortChange('time')}
            >
              Best time{sortIndicator('time', sortField, sortOrder)}
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {winners.map((winner, index) => (
          <tr key={winner.id}>
            <td>{(page - 1) * pageSize + index + 1}</td>
            <td className="winners-table__icon">
              <CarIcon color={winner.color} />
            </td>
            <td>{winner.name}</td>
            <td>{winner.wins}</td>
            <td>{winner.time}s</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default WinnersTable
