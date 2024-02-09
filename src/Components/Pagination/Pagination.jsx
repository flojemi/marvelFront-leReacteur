import "./Pagination.css";

export default function Pagination({
  currentPage,
  setCurrentPage,
  resultsNumber,
  limitValue,
}) {
  const totalPage = Math.ceil(resultsNumber / limitValue);

  const handlePreviousClick = () => {
    setCurrentPage((currentPage) => currentPage - 1);
  };

  const handleNextClick = () => {
    setCurrentPage((currentPage) => currentPage + 1);
  };

  return (
    <div className="pagination-nav">
      <button
        onClick={handlePreviousClick}
        className={
          currentPage > 1 ? "pagination-button" : "pagination-button pagination-hidden"
        }
      >
        {"Previous"}
      </button>
      <p>
        Page {currentPage}/{totalPage}
      </p>
      <button
        onClick={handleNextClick}
        className={
          currentPage < totalPage
            ? "pagination-button"
            : "pagination-button pagination-hidden"
        }
      >
        {"Next"}
      </button>
    </div>
  );
}
