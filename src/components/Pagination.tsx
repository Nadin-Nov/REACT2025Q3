type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  return (
    <div className="pagination">
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage <= 1}>
        ← Prev
      </button>

      <span style={{ margin: '0 1rem' }}>
        Page {currentPage} of {totalPages}
      </span>

      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage >= totalPages}>
        Next →
      </button>
    </div>
  );
};
