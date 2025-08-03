  
import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import NominationForm from '../forms/NominationForm';
import WithDraw from '../buttons/WithDrawBtn';
import { connect } from 'react-redux';
import Web3 from 'web3';
import ProposalForm from '../forms/ProposalForm';
import { Loader } from 'rimble-ui';

const ExpiredWDModal= ({ props, userManaBalance, nftAddress, expiresAt, assetPrice, tokenId, orderStatus, orderId,  }) => {

  const {drizzleState, drizzle} = props;
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

return (   
      <>   
        <button type="button" className="btn btn-lg btn-block card-footer-btn" onClick={handleShow}>
          Expired DNA
        </button> 
        <Modal className="nomintation-modal" show={show} onHide={handleClose}>
          <Modal.Header className="text-center justify-content-center" closeButton>
            <Modal.Title className="text-center justify-content-center">
            <div className="current-price-title">DNA Sale Cancelled</div>
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
              tokenId={tokenId}
              userManaBalance={userManaBalance}
              orderStatus={orderStatus}
              orderId={orderId}
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
              .card-footer-btn{background:#007bff;color:#000000}
              .btn-lg{border-radius: 0rem;
                border-top-left-radius: 0rem;
                border-top-right-radius: 0rem;
                border-bottom-right-radius: .5rem;
                border-bottom-left-radius: .5rem;}
              .card-footer-btn:hover{background:#3396ff;;}
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
        
        
        
export default connect(null, mapDispatchToProps)(ExpiredWDModal);
