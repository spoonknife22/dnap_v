
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { CardFooter } from "shards-react";
import NominationModal from '../modals/NominationModal';
import ExpiredWDModal from '../modals/ExpiredWDModal';
import SaleModal from '../modals/SaleModal.js';
import SoldModal from '../modals/SoldModal';
import PaidOutModal from '../modals/PaidOutModal.js';
import PurchaseModal from '../modals/PurchaseModal.js';

const ExpCardFtrBtn = ({ props, userManaBalance, getSoldStatus, nftAddress, expiresAt, assetPrice, tokenId, orderId, getOrderId, orderStatus }) => {

  const [isStatus, setStatus] = useState();
  const [isContractOrderId, setContractOrderId] = useState();
  const [isOrderStatus, setOrderStatus] = useState();
  const [loading, setLoading] = useState(false);

  const oderStatusCall = (orderId) => {

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
 
  
    const graphql = JSON.stringify({ query: 
      `{
        orders(where: {id:"${orderId}",category:parcel }) {
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
      const proposalBalance = await props.drizzle.contracts.MANAToken.methods.balanceOf(`${proposalAddress}`).call();
      const propData = await props.drizzle.contracts.ProposalController.methods.getPropData(`${proposalAddress}`).call();
      const statusString = (propData[0])
      setStatus(statusString.toString());
      const status = propData[0];
      getOrderId(propData[2]);
      setContractOrderId(propData[2]);
      oderStatusCall(propData[2]);

      //status 4
      if(status === '4'){
        //Production code to ensure sale went through and payout can be run
        //if(proposalBalance > assetPrice && isOrderStatus === 'sold'){
        if(proposalBalance > assetPrice){  
          const soldStatus = '6';
          getSoldStatus(proposalBalance, soldStatus);
          setStatus('6');
        }
        else{
            setStatus(status);
            getOrderId(orderId);
        }
      }
      //status 4 End
        else {
          setStatus(status);
          getOrderId(orderId);
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


      // if(isStatus === '0' && `"${orderId}"` === `"${isContractOrderId}"`){
      if(isStatus === '0'){
        //0-FUNDING
        return (
            <CardFooter className="p-0">{console.log(userManaBalance)}
              <ExpiredWDModal 
                nftAddress={nftAddress}
                tokenId={tokenId}
                assetPrice={assetPrice}
                expiresAt={expiresAt}  
                props={props} 
                userManaBalance={userManaBalance}
                orderStatus={isOrderStatus}
                orderId={isContractOrderId}
              />
            </CardFooter> 
          )
        }
      //else if(isStatus === '0' && `'${isContractOrderId}'` !== 'undifined') {
      else if(isStatus === '0' &&  isOrderStatus === 'cancelled' || isOrderStatus === 'sold') {
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
      else if(isStatus === '4' && orderStatus === 'cancelled') {
        //1st Sale Expired
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
                contractStatus = {isStatus}
              />
            </CardFooter> 
        )
    }
      else if(isStatus === '6') {
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
      else if(isStatus === '10' && orderStatus === 'cancelled') {
        //2st Sale Expired
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
                contractStatus = {isStatus}
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
  
  const mapDispatchToProps = (dispatch) => ({
    getOrderId: (storedOrderId) =>  dispatch({ type: "GOT_STORED_ORDER_ID", storedOrderId: storedOrderId })
  });
    
    
  export default connect(null, mapDispatchToProps)(ExpCardFtrBtn);