import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const ellipsisThreshold = 2; // Number of pages before and after current page to show ellipsis

    // Calculate the range of page numbers to display
    let start = Math.max(1, currentPage - ellipsisThreshold);
    let end = Math.min(totalPages, currentPage + ellipsisThreshold);

    // Add the starting page numbers
    for (let i = 1; i <= Math.min(5, end); i++) {
      pageNumbers.push(renderPageButton(i));
    }

    // Add the ellipsis if required
    if (start > 1) {
      pageNumbers.push(renderEllipsis());
    }

    // Add the ending page numbers
    for (let i = Math.max(start, 6); i <= end; i++) {
      pageNumbers.push(renderPageButton(i));
    }

    // Add the ellipsis if required
    if (end < totalPages) {
      pageNumbers.push(renderEllipsis());
    }

    return pageNumbers;
  };

  const renderPageButton = (pageNumber) => (
    <li key={pageNumber} className={currentPage === pageNumber ? 'active' : ''}>
      <button onClick={() => onPageChange(pageNumber)} className={currentPage === pageNumber ? 'active' : ''}>{pageNumber}</button>
    </li>
  );

  const renderEllipsis = () => (
    <li key="ellipsis" className="ellipsis">
      ...
    </li>
  );

  return (
    <ul className="pagination">
      <li>
        <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
          <img src='/images/angle-left.svg' alt='' />
        </button>
      </li>
      {renderPageNumbers()}
      <li>
        <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          <img src='/images/angle-right.svg' alt='' />
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
