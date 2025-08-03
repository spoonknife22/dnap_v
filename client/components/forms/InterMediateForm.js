import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import SellAsset from './SellAsset.js';
import SecondSellAsset from './SecondSellAsset.js';
import Purchase from './Purchase.js';
import ContributeForm from './ContributeForm';
import { Loader } from 'rimble-ui';
import ForSaleInnerModal from '../modals/ForSaleInnerModal.js';
import AwardAsset from '../modals/AwardAssetModal.js';
import SoldAsset from './SoldAsset.js';
import WithDraw from '../buttons/WithDrawBtn';
import moment from "moment";

const InterMediateForm = ({ drizzle, drizzleState, assetPrice, propAddress, tokenId, soldStatus, proposalBalance, orderStatus, depositAmount, orderId, storedOrderId, prevOrderStatus }) => {     
  const nowUnix = moment().valueOf();
  const [status, setProposalSatus] = useState(null);
  const [saleExpiration, setSaleExpiration] = useState(null);

    useEffect(() => {
      fetchProposalStatus();
    }, [propAddress])

    const fetchProposalStatus = async () => { 
      const contract = drizzle.contracts[`${propAddress}`];
      const reSaleExpiresAt = await contract.methods.reSaleExpiresAt().call();
      const dataKey = contract.methods['proposals'].cacheCall(tokenId);
      setSaleExpiration(reSaleExpiresAt);
      setProposalSatus(dataKey);  
    }

    const propContracts = drizzleState.contracts[`${propAddress}`];
    
    //0-FUNDING, 1-FUNDED, 2-WITHDRAWING, 3-PURCHASED, 4-FOR_SALE, 5-SOLD, 6-PAYINGOUT, 7-PAIDOUT, 8-EXPIRED, 9-SALE_FAILED, 10-AWARDED
    if(propContracts.proposals[status]) {
      const displayData = propContracts.proposals[status]; 
      const proposalStatus =  displayData && displayData.value.status;
      //TESTING AWARDASSET
      //const proposalStatus = '10';
    
    if(proposalStatus.toString() === '0' && orderStatus === 'open'){
    //0-FUNDING
    return (
            <>
              <ContributeForm drizzle={drizzle} drizzleState={drizzleState} assetPrice={assetPrice} propAddress={propAddress} tokenId={tokenId} orderStatus={orderStatus} prevOrderStatus={prevOrderStatus} orderId={orderId} storedOrderId={storedOrderId} />
            </>
      )
    }
    else if(proposalStatus.toString() === '0' && orderStatus === 'cancelled') {
      return (
        <div className="modal-body text-deposit-complete justify-content-center px-1 py-1s">
          {depositAmount > 0  ?
            <div>
              <div className="text-center">
                Sale cancelled. Click to withdraw your MANA.
              </div>  
              <WithDraw 
                depositAmount={depositAmount} 
                drizzleState={drizzleState} 
                drizzle={drizzle} 
                propAddress={propAddress} 
                prevOrderStatus={prevOrderStatus}
              />
            </div>
          :
            <div className="text-center">
              You did not contribute to this DNA.
            </div>  
          }
        </div>
      ) 
    }
  else if(proposalStatus.toString() === '1') {
     //FUNDED
    return (
      <div className="modal-body text-deposit-complete justify-content-center px-1 py-1">
        <Purchase drizzle={drizzle} drizzleState={drizzleState} assetPrice={assetPrice} propAddress={propAddress} tokenId={tokenId} prevOrderStatus={prevOrderStatus} />
      </div>
    )
      
    }
    else if(proposalStatus.toString() === '2') {
      //WITHDRAWING
      return  (
        <>
         <div className="mx-auto modal-body justify-content-center px-1 py-1"> 
          <p className="text-center">
            Withdrawal in progress...
          </p>  
            <Loader className="mx-auto" color="#007bff" size="40px" />
        </div>
        </>
      )
    }
    else if(proposalStatus.toString() === '3' && orderStatus === 'open') {
      //PURCHASED ********double check if resal failed orderStatus would be cancelled or sold
      return  (
        <div className="modal-body text-deposit-complete justify-content-center px-1 py-1">
          <SellAsset drizzle={drizzle} drizzleState={drizzleState} propAddress={propAddress} tokenId={tokenId} prevOrderStatus={prevOrderStatus} />
        </div>
      )  
    }
    //Second Sale attempt
    else if(proposalStatus.toString() === '4' && orderStatus === 'cancelled') {
      return  (
        <>{console.log(proposalStatus)}
          <div className="modal-body text-deposit-complete justify-content-center px-1 py-1">
              <div className="modal-body text-deposit-complete justify-content-center px-1 py-1">
                <SecondSellAsset 
                  drizzle={drizzle} 
                  drizzleState={drizzleState} 
                  propAddress={propAddress} 
                  tokenId={tokenId} 
                  prevOrderStatus={prevOrderStatus} 
                  orderStatus={orderStatus} 
                  proposalStatus={proposalStatus} 
                />
              </div>
          </div>     
        </>
      )   
    }
    else if(proposalStatus.toString() === '4' && orderStatus !== 'sold') {
      //FOR_SALE
      return  (
        <>
          <div className="modal-body text-deposit-complete justify-content-center px-1 py-1">
            <ForSaleInnerModal 
              drizzle={drizzle}
              drizzleState={drizzleState} 
              propAddress={propAddress}
              prevOrderStatus={prevOrderStatus}
            />
          </div>     
        </>
      )   
    }
    else if(proposalStatus.toString() === '10' && orderStatus === 'cancelled') {
      return  (
        <>
          <div className="modal-body text-deposit-complete justify-content-center px-1 py-1">
            <AwardAsset 
              drizzle={drizzle}
              drizzleState={drizzleState} 
              propAddress={propAddress}
              tokenId={tokenId}
              prevOrderStatus={prevOrderStatus}
            />
          </div>     
        </>
      )   
    }
    //SOLD & Paying out
    else if(proposalStatus.toString() === '6' || orderStatus === 'sold') {
      return  (
        <>
          <div className="modal-body text-deposit-complete justify-content-center px-1 py-1">
            {proposalBalance !== null ?
              <SoldAsset 
                drizzle={drizzle} 
                drizzleState={drizzleState} 
                propAddress={propAddress} 
                tokenId={tokenId}  
                proposalBalance={proposalBalance}
                prevOrderStatus={prevOrderStatus}
                startPay = {true}
              />
            :
              console.log('Loading...')
            }
          </div>
        </>
      )  
    }
    else if(proposalStatus.toString() === '7') {
      //PaidOut
      return  (
        <div className="modal-body text-deposit-complete justify-content-center px-1 py-1">
          <p className="text-center">
            DNA Sold and Payout Complete
          </p>
        </div>
      )
    }
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
  soldStatus: state.appReducers.status,
  proposalBalance: state.appReducers.proposalBalance,
  depositAmount:state.appReducers.depositAmount
})

export default connect(mapStateToProps, null)(InterMediateForm);