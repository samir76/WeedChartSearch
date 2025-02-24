import React from 'react';

export default function Pagination({ currentPage, itemsPerPage, changePage, totalItems }) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    if ((i <= 3 && currentPage <= 5) || i === totalPages || i === totalPages - 1 || i === totalPages - 2 || (i >= currentPage - 1 && i <= currentPage + 1)) {
      pages.push(i);
    }
  }

  return (
    <div className='pagination'>
      <ul>
        {pages.map((pageNumber, index, array) => (
          <React.Fragment key={pageNumber}>
            <li
              onClick={() => changePage(pageNumber)}
              className={pageNumber === currentPage ? 'active' : ''}
              style={{ 
                backgroundColor: pageNumber === currentPage ? 'green' : 'white',
                color: pageNumber === currentPage ? 'white' : 'black',
                border: pageNumber === currentPage ? '1px solid green' : '1px solid black', 
              }} 
            >
              {pageNumber}
            </li>
            {(array[index + 1] - pageNumber > 1) && <li>...</li>}
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
}