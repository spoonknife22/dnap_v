  
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';
import Web3 from 'web3';
import ProposalForm from '../forms/ProposalForm';
import { Loader } from 'rimble-ui';
import Accordion from 'react-bootstrap/Accordion';
import { Button } from "shards-react";

const FundingModal= ({ props, storedOrderId, prevOrderStatus, userManaBalance, nftAddress, expiresAt, assetPrice, tokenId, orderStatus, orderId }) => {

  const {drizzleState, drizzle} = props;
  
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

return (   
      <>   
        <button type="button" className="btn btn-lg btn-block card-footer-btn" onClick={handleShow}>
          Fund DNA
        </button>
        <Modal className="nomintation-modal" show={show} onHide={handleClose}>
          <Modal.Header className="text-center justify-content-center" closeButton>
          {orderStatus === 'open' ?
            <Modal.Title className="text-center justify-content-center">
              <div className="current-price-title">Current Price:&nbsp;{Web3.utils.fromWei(`${assetPrice}`,'ether')}&nbsp;MANA</div>
              <p className="mana-balance mb-1" >Your MANA Balance:&nbsp;<span className="amount-number">{userManaBalance}</span></p>
            </Modal.Title>
          :
            <Modal.Title className="text-center justify-content-center">
              <div className="current-price-title">Current Price:&nbsp;{Web3.utils.fromWei(`${assetPrice}`,'ether')}&nbsp;MANA</div>
              <p className="mana-balance mb-1" >Your MANA Balance:&nbsp;<span className="amount-number">{userManaBalance}</span></p>
            </Modal.Title>
          }    
          </Modal.Header>
          <Modal.Body className="pt-1 align-items-center">
            <Accordion defaultActiveKey="1">
              <div className="m-2">
                <Accordion.Toggle as={Button} size="sm" variant="link" eventKey="0" outline theme="secondary">
                <div>Deposits</div>
                </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0">
                    <div className="mb-3">
                      <small className="text-muted">You must approve MANA before a deposit. A deposit may be withdrawn at anytime prior to purchase. Once the deposit amount has reached the current price the contract will purchase the asset and immediately put it up for resale. </small>
                    </div>
                  </Accordion.Collapse>
              </div> 
            </Accordion>
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
                userManaBalance={userManaBalance}
                orderStatus={orderStatus}
                storedOrderId={storedOrderId}
                prevOrderStatus={prevOrderStatus}
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
        
        
        
export default connect(null, mapDispatchToProps)(FundingModal);
     