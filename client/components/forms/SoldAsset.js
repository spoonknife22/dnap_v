import React, { useState, useEffect } from 'react';
//import { connect } from 'react-redux';
import { newContextComponents } from "@drizzle/react-components";
import { Button, Progress, Row, Form } from "shards-react";
import Web3 from "web3";
import { Loader } from 'rimble-ui';

//data.balance is 0 because it does not update until payout starts
const { ContractForm } = newContextComponents;

const SoldAsset = ({drizzle, drizzleState, propAddress, tokenId, startPay, proposalBalance }) => {
  const account = drizzleState.accounts[0];
  const [deposits, setDespositInfo] = useState([]);
  const [reSalePrice, setReSalePrice] = useState(null);

  useEffect(() => {
    fetchProposalInfo();
  }, [])

  const fetchProposalInfo = async () => { 
      let state = drizzle.store.getState()
      if(state.drizzleStatus.initialized){
      const proposalContract = await drizzle.contracts[`${propAddress}`];
      const depositInfoLength = await proposalContract.methods.countDepositers().call();
      const propData = await proposalContract.methods["proposals"](`${tokenId}`).call();
      const convertedReSalePrice = Web3.utils.fromWei(`${propData.reSalePrice}`,'ether');
      const convertedListPrice= Web3.utils.fromWei(`${propData.listPrice}`,'ether');
      setReSalePrice(convertedReSalePrice)

      let i;
      let depositerArray = [];
        for (i = 0; i < depositInfoLength; i++) {
          const depositer = await proposalContract.methods.depositersArray([i]).call();
          const depositAmount = await proposalContract.methods.deposits(depositer).call();
          let depositerAmount = Web3.utils.fromWei(depositAmount,'ether');
          let convertPropBalance = Web3.utils.fromWei(`${proposalBalance}`,'ether');
          let listPricePercent = ((depositerAmount / convertedListPrice) * 100).toFixed(0);
          let depositerPayOut = (convertPropBalance/100) * listPricePercent;
          depositerArray.push([i, depositer, depositerPayOut]);
          setDespositInfo(depositerArray);
      }  
  }
   return console.log('Loading....')
  };

  return(
    <>
      {deposits.length > 0 ?   
        <Row className="card-text justify-content-center mt-1"> 
          <div>
            <Row>
              <h5 className="mb-1">
                Investors:
              </h5>
            </Row>
          {deposits.map(deposit => (
            <div className="deposit-info" key={deposit[0]} >
              <Row className="border-top"> 
                <div>  
                  <p className="mb-1">
                    {deposit[1]}     
                  </p>
                  <p className="deposit-text text-left mb-1">
                   Payout&nbsp;Amount:&nbsp;<span className="purchase-price">{deposit[2]}</span>&nbsp;MANA
                  </p>
                  {/* <Progress className="mb-2" value={deposit[2]} max={Web3.utils.fromWei(proposalBalance,'ether')} ></Progress> */}
                </div>
              </Row>
            </div>
          ))}
          </div>
          <style jsx>
            {` 
              .card-text{font-family:Poppins;font-size:1rem;}
              .purchase-price{font-size:1rem;color:#007bff;}
              .deposit-info{color:#000;font-weight:400;}
              .deposit-text{font-size:1rem;color:#000;font-weight:300;}
            `}                
          </style>
        </Row>
      :
        <div className="align-items-center mb-2">   
          <Loader className="mx-auto" color="#007bff" size="40px" />
        </div>
      } 
      {deposits.map(deposit => (
        <div className="deposit-info" key={deposit[0]} >
          {deposit[1] === account    ?
              <ContractForm
                drizzle={drizzle}
                drizzleState={drizzleState}
                contract={propAddress}
                method="payOut" 
                sendArgs={{ from:account }}
                render={({ handleSubmit }) => (
                  <Form onSubmit={handleSubmit}>
                    <div className="modal-footer">
                      <button className="btn btn-block btn-success" key="submit" type="button" onClick={handleSubmit} style={{ fontSize: 16 }} > 
                        Your&nbsp;Payout:&nbsp;{deposit[2]}&nbsp;MANA 
                      </button>
                    </div>
                  </Form>
                  )}
                >
              </ContractForm>   
            :
              console.log('Account not an investor')
          }
        </div>
      ))}     
      <div className="border-top">
        <p className="text-center progress-text mt-2 mb-1">
          Sold For:&nbsp;{reSalePrice}&nbsp;MANA
        </p>
        <Progress className="mb-1 mt-1" value={Web3.utils.fromWei(`${proposalBalance}`,'ether')}  max={reSalePrice}  >{Web3.utils.fromWei(`${proposalBalance}`,'ether')}&nbsp;MANA</Progress>
        <style jsx> {` 
          .sell-text{font-weight:400;color:black;font-size:1rem;font-family: Poppins;}
          .progress-text{font-weight:400;color:black;font-size:.9rem;font-family: Poppins;}
          .amount-number {color:#66a3ff;font-family: Poppins} 
          `}    
        </style>
      </div>
    </>
  )
}

export default SoldAsset;














  