import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Web3 from "web3";
import InterMediateForm from '../forms/InterMediateForm';
import { Loader } from 'rimble-ui';

const ContributeInnnerModal = ({ props, gotContractBalance, proposalStorageAbi, gotPropContract  }) => {
  const { drizzleState, drizzle, propAddress, tokenId, assetPrice, orderStatus, orderId, storedOrderId, prevOrderStatus } = props;
  //const [status, setProposalSatus] = useState(null);
  console.log(propAddress)
  let web3 = new Web3(Web3.givenProvider);

  if(tokenId === null){
    return(
      <div className="mx-auto">   
        <Loader color="#007bff" size="40px" />
      </div>
    )
  }

  {propAddress && proposalStorageAbi ? 
    useEffect(() => {
      fetchProposalAddress();
    }, [propAddress])

  :
    <div className="mx-auto">   
      {propAddress} ContributeInnerModal 27
      <Loader color="#007bff" size="40px" />
    </div>
  }
const fetchProposalAddress = async () => {
      let proposalAddress = `${propAddress}`;

      const contractConfig = {
        contractName: `${propAddress}`,
        web3Contract: new web3.eth.Contract(proposalStorageAbi, proposalAddress)
      };

      if (!drizzle.contracts[`${propAddress}`]) {
      let events = ['ContributionSuccess','ProposalEvent','LogNewProvableQuery','RandomFailure'] ;  
      drizzle.addContract(contractConfig, events);
      }

      if(drizzle.contracts[`${propAddress}`]){
        const proposalContract = drizzle.contracts[`${propAddress}`];
        const contractData = await proposalContract.methods.proposals(`${tokenId}`).call();
        const { listPrice, balance, expiresAt } = contractData;
        const depositAmount = await proposalContract.methods.depositedAmount(drizzleState.accounts[0]).call();
        gotContractBalance(balance, depositAmount, listPrice, expiresAt); 
        gotPropContract(proposalContract);
    }
  
}
 
if (drizzle.contracts[`${propAddress}`]) {
  return ( 
        <>
          <InterMediateForm 
            drizzle={drizzle} 
            drizzleState={drizzleState} 
            assetPrice={assetPrice} 
            propAddress={propAddress} 
            tokenId={tokenId} 
            orderStatus={orderStatus} 
            orderId={orderId}  
            storedOrderId={storedOrderId}
            prevOrderStatus={prevOrderStatus}
          />
        </>
      );    
  } 

  else {
    return (
      <div className="mx-auto">   
        <Loader className="mx-auto" color="#007bff" size="40px" />
      </div>
    )
  }

  
}

  const mapStateToProps = (state) => ({
    proposalStorageAbi: state.appReducers.proposalStorageAbi
  })

const mapDispatchToProps = (dispatch) => ({
  gotContractBalance: (balance, depositAmount, listPrice, expiresAt) => dispatch({ type:'PROPOSAL_BALANCE', balance:`${balance}`, depositAmount: depositAmount, listPrice:listPrice, expiresAt:expiresAt}),
  gotPropContract: (proposalContract) => dispatch({ type:'PROPOSAL_STORAGE_CONTRACT', proposalStorage:proposalContract})
});


export default connect(mapStateToProps, mapDispatchToProps)(ContributeInnnerModal);