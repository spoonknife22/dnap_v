import React from 'react';


const Pagination = ({ parcelsPerPage, totalParcels, paginate, currentPage  }) => {
  
const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalParcels / parcelsPerPage); i++) {
    pageNumbers.push(i);
  }

  if(totalParcels > parcelsPerPage)
    return (
      <nav> 
        <ul className="pagination">
          {pageNumbers.map(PageNumber => (
            <li key={PageNumber}  className={`page-item${currentPage === PageNumber ? ' active' : ''}`}>
              <a className='page-link' onClick={() => paginate(PageNumber)} href="#" >
                {PageNumber}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    )
  else{
    return <></>
  }  
}

export default Pagination;  
