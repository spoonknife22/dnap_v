import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Loader } from 'rimble-ui';
import InitialContributeModal from '../modals/InitialContibModal';
import InnerPropForm  from './InnerPropForm'
import { newContextComponents } from "@drizzle/react-components";
const { ContractData, ContractForm } = newContextComponents;

const ProposalForm = ({ drizzle, storedOrderId, prevOrderStatus, drizzleState, props, getCurrentProp, tokenId, assetPrice, userManaBalance,expiresAt, nftAddress, gotApprovedBalance, orderId, orderStatus }) => {     

const [currentProp, setCurrentProp] = useState(null);
const [currentApproval, setCurrentApproval] = useState(null);

const fetchProposalAddress = async () => {
  const proposalAddress = await drizzle.contracts.ProposalController.methods.getPropTokenIdMap(`${tokenId}`).call(); 
  setCurrentProp(proposalAddress);
  getCurrentProp(proposalAddress);

  const account = drizzleState.accounts[0];
  const manaContract = drizzle.contracts.MANAToken; 
  const approvedAmount = await manaContract.methods.allowance(account,proposalAddress).call();
  setCurrentApproval(approvedAmount)
  gotApprovedBalance(approvedAmount);
}

useEffect(() => {
  fetchProposalAddress();
}, [currentProp || currentApproval]);
   

if(!currentProp){
  return (
    <div className="align-items-center"> 
      {currentProp} ProposalForm 25  
      <Loader className="mx-auto" color="#007bff" size="40px" />
    </div>
    )
  }
if(currentProp){
 return (
   <div>      
    <InnerPropForm
      assetPrice={assetPrice}  
      expiresAt={expiresAt}
      nftAddress={nftAddress}
      props={props}
      drizzle={drizzle}
      drizzleState={drizzleState}
      tokenId={tokenId}
      orderId={orderId}
      storedOrderId={storedOrderId}
      userManaBalance={userManaBalance}
      orderStatus={orderStatus}
      prevOrderStatus={prevOrderStatus}
    /> 
    </div>
    )
  }
  else{
    <div className="align-items-center"> 
      {currentProp} ProposalForm 44  
      <Loader className="mx-auto" color="#007bff" size="40px" />
    </div>
  }  
}

const mapDispatchToProps = (dispatch) => ({
  getCurrentProp: (proposalAddress) =>  dispatch({ type: "GOT_PROP_ADDRESS", proposalAddress:proposalAddress }),
  gotApprovedBalance: (approvedAmount) => dispatch({ type:'APROVED_AMOUNT', approvedAmount:approvedAmount }),
});
      
      
export default connect(null, mapDispatchToProps)(ProposalForm);