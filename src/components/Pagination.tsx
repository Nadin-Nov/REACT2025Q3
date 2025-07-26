type PaginationProps = {
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination = ({ currentPage, onPageChange }: PaginationProps) => {
  return (
    <div className="pagination" style={{ marginTop: '1rem' }}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        ← Prev
      </button>

      <span style={{ margin: '0 1rem' }}>Page {currentPage}</span>

      <button onClick={() => onPageChange(currentPage + 1)}>
        Next →
      </button>
    </div>
  );
};
