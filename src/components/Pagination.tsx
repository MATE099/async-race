interface PaginationProps {
  page: number
  total: number
  pageSize: number
  onPageChange: (page: number) => void
}

function Pagination({
  page,
  total,
  pageSize,
  onPageChange,
}: PaginationProps): JSX.Element {
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const isFirstPage = page <= 1
  const isLastPage = page >= totalPages

  return (
    <div className="pagination">
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={isFirstPage}
      >
        Prev
      </button>
      <span className="pagination__info">
        Page {page} / {totalPages}
      </span>
      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={isLastPage}
      >
        Next
      </button>
    </div>
  )
}

export default Pagination
