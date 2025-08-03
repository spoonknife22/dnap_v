  
import React from 'react';

const PaidOutModal = ({ }) => {

return (   
      <>   
        <button type="button" className="btn btn-lg btn-block card-footer-btn">
          Sold and Paid Out
        </button>
        <style jsx>
          {` 
              .current-price-title{font-size:1.3rem;}
              .nomintation-modal{font-family: Poppins;}
              .card-footer-btn{background:#c4183c;color:#ffffff}
              .btn-lg{border-radius: 0rem;
                border-top-left-radius: 0rem;
                border-top-right-radius: 0rem;
                border-bottom-right-radius: .5rem;
                border-bottom-left-radius: .5rem;}
              .mana-balance{font-size:.9rem;color:#000;font-weight: 200;text-align:left}
              .amount-number{font-family:Poppins;color:#66a3ff;}
          `}                
        </style>
      </>
        );    
      } 
          
export default PaidOutModal;
      