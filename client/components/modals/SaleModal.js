  
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';
import ProposalForm from '../forms/ProposalForm';
import { Loader } from 'rimble-ui';

const SaleModal = ({ props, orderId, storedOrderId, contractStatus, prevOrderStatus, orderStatus, userManaBalance, nftAddress, expiresAt, assetPrice, tokenId }) => {

  const {drizzleState, drizzle} = props;
  console.log(contractStatus)
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);


return (      
      <>  
        {contractStatus === '4' && orderStatus === 'open' ?
          <button type="button" className="btn btn-lg btn-info btn-block card-footer-btn" onClick={handleShow}>
            DNA SALE
          </button>
        :  (contractStatus === '4' && orderStatus === 'cancelled' ?  

          <button type="button" className="btn btn-lg btn-info btn-block card-footer-btn" onClick={handleShow}>
            1ST SALE EXPIRED
          </button>
        :
          <button type="button" className="btn btn-lg btn-info btn-block card-footer-btn" onClick={handleShow}>
            2nd SALE EXPIRED
          </button>
        )} 
        <Modal className="nomintation-modal" show={show} onHide={handleClose}>
          <Modal.Header className="text-center justify-content-center" closeButton>
            <Modal.Title className="text-left justify-content-Left">
            <div className="current-price-title">Current Price:&nbsp;{Web3.utils.fromWei(`${assetPrice}`,'ether')}&nbsp;MANA</div>
            <p className="mana-balance mb-1" >Your MANA Balance:&nbsp;<span className="amount-number">{userManaBalance}</span></p>
          </Modal.Title>
        </Modal.Header>
          <Modal.Body className="pt-1 align-items-center">
          {tokenId !== null ?   
            <ProposalForm                  
              nftAddress={nftAddress}
              tokenId={tokenId}
              assetPrice={assetPrice}
              expiresAt={expiresAt} 
              props={props}
              drizzle={drizzle}
              drizzleState={drizzleState}
              orderId={orderId}
              storedOrderId={storedOrderId}
              prevOrderStatus={prevOrderStatus}
              orderStatus={orderStatus}
              userManaBalance={userManaBalance}
            /> 
          :
            <div className="align-items-center">   
              <Loader className="mx-auto" color="#007bff" size="40px" />
            </div>
          } 
          </Modal.Body>
        </Modal>
        <style jsx>
          {`  
              .current-price-title{font-size:1.3rem;}
              .nomintation-modal{font-family: Poppins;}
              .btn-lg{border-radius: 0rem;
                border-top-left-radius: 0rem;
                border-top-right-radius: 0rem;
                border-bottom-right-radius: .5rem;
                border-bottom-left-radius: .5rem;}
              .card-footer-btn:hover{background:#e6e6e6;color:#000000;}
              .mana-balance{font-size:.9rem;color:#000;font-weight: 200;text-align:left}
              .amount-number{font-family:Poppins;color:#66a3ff;}
          `}                
        </style>
      </>
        );    
      } 
  
        const mapDispatchToProps = (dispatch) => ({
          getTokenId: (tokenId) =>  dispatch({ type: "SET_TOKEN_ID", tokenId:tokenId }),
          //getNftAddress: (nftAddress) =>  dispatch({ type: "SET_NftAddress", NftAddress:nftAddress }),
        });
        
        
export default connect(null, mapDispatchToProps)(SaleModal);
     