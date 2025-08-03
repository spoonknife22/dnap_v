
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { CardFooter } from "shards-react";
import NominationModal from '../modals/NominationModal';
import FundingModal from '../modals/FundingModal.js';
import SaleModal from '../modals/SaleModal.js';
import SoldModal from '../modals/SoldModal.js';
import PaidOutModal from '../modals/PaidOutModal.js';
import PurchaseModal from '../modals/PurchaseModal.js';


const CardFooterButton = ({ props, userManaBalance, getSoldStatus, nftAddress, expiresAt, assetPrice, tokenId, orderId, getOrderId, orderStatus }) => {
  //Contract Proposal Status
  const [isStatus, setStatus] = useState();
  //Contract OrderId
  const [isContractOrderId, setContractOrderId] = useState();
  //Current Order status from Marketplace
  const [isOrderStatus, setOrderStatus] = useState();

  //Contract Proposal Address
  const [ispropAddress, setpropAddress] = useState();

  const [loading, setLoading] = useState(false);

  const oderStatusCall = (contractOrderId) => {

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
 
  
    const graphql = JSON.stringify({ query: 
      `{
        orders(where: {id:"${contractOrderId}",category:parcel }) {
          status
        }
      }`
  })
  
  const targetUrl = 'https://api.thegraph.com/subgraphs/name/decentraland/marketplace'
  fetch(targetUrl, {
    method: "POST",
    headers:myHeaders,  
    body:graphql, variables:{},
    redirect: 'follow'
  })
    .then(res => res.json())
    .then( async (result) => {
        setOrderStatus(result.data.orders[0].status);
        setLoading(false); 
    },
    (error) => {
    return error;
    }
  )
  }

  const fetchProposals = async () => {
    const proposal = await props.drizzle.contracts.ProposalController.methods.deployedProposals(`${tokenId}`).call();
    if(proposal){
      const proposalAddress = await props.drizzle.contracts.ProposalController.methods.proposalTokenIdMap(`${tokenId}`).call();
      setpropAddress(proposalAddress);
      const proposalBalance = await props.drizzle.contracts.MANAToken.methods.balanceOf(`${proposalAddress}`).call();
      const propData = await props.drizzle.contracts.ProposalController.methods.getPropData(`${proposalAddress}`).call();
      const statusString = (propData[0])
      setStatus(statusString.toString());
      const status = propData[0];
      getOrderId(propData[2]);
      setContractOrderId(propData[2]);
      oderStatusCall(propData[2]);
      console.log(proposal)
      //status 4
      if(status === '4'){
        //Production code to ensure sale went through and payout can be run
        //if(proposalBalance > assetPrice && isOrderStatus === 'sold'){
        if(proposalBalance > assetPrice){  
          const soldStatus = '6';
          {console.log(proposalBalance)}
          getSoldStatus(proposalBalance, soldStatus);
          setStatus('6');
        }
        else{
            setStatus(status);
            getOrderId(orderId);
        }
      }
    }
      else if (!proposal){
        setStatus()
        getOrderId(orderId);
        setContractOrderId()
      }
    }

    useEffect(() => {
      fetchProposals();
    }, [tokenId]);


      if(isStatus === '0' &&  isOrderStatus === 'open'){
        //0-FUNDING
        return (
            <CardFooter className="p-0">
              <FundingModal 
                nftAddress={nftAddress}
                tokenId={tokenId}
                assetPrice={assetPrice}
                expiresAt={expiresAt}  
                props={props} 
                userManaBalance={userManaBalance}
                orderStatus={orderStatus}
                orderId={orderId}
                storedOrderId={isContractOrderId}
                prevOrderStatus={isOrderStatus}
                propAddress={ispropAddress}
              />
            </CardFooter> 
          )
        }

      else if(isStatus === '0' &&  isOrderStatus === 'cancelled' || isOrderStatus === 'sold') {
        return (
            <CardFooter className="p-0">
               <FundingModal 
                nftAddress={nftAddress}
                tokenId={tokenId}
                assetPrice={assetPrice}
                expiresAt={expiresAt}  
                props={props} 
                userManaBalance={userManaBalance}
                orderStatus={orderStatus}
                orderId={orderId}
                storedOrderId={isContractOrderId}
                prevOrderStatus={isOrderStatus}
                propAddress={ispropAddress}
              />
            </CardFooter> 
        )
      }
      else if(isStatus === '1') {
        return (
            <CardFooter className="p-0">
              <PurchaseModal 
                nftAddress={nftAddress}
                tokenId={tokenId}
                assetPrice={assetPrice}
                expiresAt={expiresAt} 
                props={props} 
                userManaBalance={userManaBalance}
                orderId={orderId}
                storedOrderId={isContractOrderId}
                prevOrderStatus={isOrderStatus}
              />
            </CardFooter> 
          )
      }
      else if(isStatus === '4' && orderStatus === 'open' ) {
        return (
            <CardFooter className="p-0">
              <SaleModal 
                nftAddress={nftAddress}
                tokenId={tokenId}
                assetPrice={assetPrice}
                expiresAt={expiresAt} 
                props={props} 
                userManaBalance={userManaBalance}
                orderStatus={orderStatus}
                orderId={orderId}
                storedOrderId={isContractOrderId}
                prevOrderStatus={isOrderStatus}
                contractStatus={isStatus}
              />
            </CardFooter> 
        )
    }
      else if(isStatus === '6' || orderStatus === 'sold') {
        return (
                <CardFooter className="p-0">
                  <SoldModal 
                    nftAddress={nftAddress}
                    tokenId={tokenId}
                    assetPrice={assetPrice}
                    expiresAt={expiresAt} 
                    props={props} 
                    userManaBalance={userManaBalance}
                    orderStatus={orderStatus}
                    orderId={orderId}
                    storedOrderId={isContractOrderId}
                    prevOrderStatus={isOrderStatus}
                  />
                </CardFooter> 
            )
      }
      else if(isStatus === '7') {
        return (
                <CardFooter className="p-0">
                  <PaidOutModal
                    nftAddress={nftAddress}
                    tokenId={tokenId}
                    assetPrice={assetPrice}
                    expiresAt={expiresAt} 
                    props={props} 
                    userManaBalance={userManaBalance}
                    orderStatus={orderStatus}
                    orderId={orderId}
                    storedOrderId={isContractOrderId}
                    prevOrderStatus={isOrderStatus}
                  />
                </CardFooter> 
            )
      }
      else{
        return (
              <CardFooter className="p-0">
                <NominationModal
                  nftAddress={nftAddress}
                  tokenId={tokenId}
                  assetPrice={assetPrice}
                  expiresAt={expiresAt} 
                  props={props} 
                  orderId={orderId}
                  userManaBalance={userManaBalance}
                  orderStatus={orderStatus}
                  storedOrderId={isContractOrderId}
                  prevOrderStatus={isOrderStatus}
                />
              </CardFooter> 
        )
      }
  }
  
  //export default CardFooterButton;

  const mapDispatchToProps = (dispatch) => ({
    getOrderId: (storedOrderId) =>  dispatch({ type: "GOT_STORED_ORDER_ID", storedOrderId: storedOrderId }),
    getSoldStatus: (proposalBalance, soldStatus) =>  dispatch({ type: "GOT_SOLD_STATUS", status: soldStatus, proposalBalance: proposalBalance }),
  });
    
    
  export default connect(null, mapDispatchToProps)(CardFooterButton);

