import React from 'react';


const OsPagination = ({ ordersPerPage, totalorders, paginate, currentPage  }) => {
  
const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalorders / ordersPerPage); i++) {
    pageNumbers.push(i);
  }

  if(totalorders > ordersPerPage)
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

export default OsPagination;  
