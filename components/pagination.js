import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li key={i} className={currentPage === i ? 'active' : ''}>
          <button onClick={() => onPageChange(i)}>{i}</button>
        </li>
      );
    }
    return pageNumbers;
  };

  return (
    <ul className="pagination">
      <li>
        <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        <img src='/images/angle-left.svg' alt=''/>
        </button>
      </li>
      {renderPageNumbers()}
      <li>
        <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        <img src='/images/angle-right.svg' alt=''/>
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
