import React from 'react';
import { newContextComponents } from "@drizzle/react-components";
import { Button, Form } from "shards-react";
import Web3 from "web3";

const { ContractForm, ContractData } = newContextComponents;

const SellAsset = ({drizzle, drizzleState, propAddress, tokenId }) => {
  const account = drizzleState.accounts[0];

  return(
      <ContractForm
        drizzle={drizzle}
        drizzleState={drizzleState} 
        contract={propAddress}
        method="sellAsset" 
        sendArgs={{ from:account}}
        render={({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <div className="justify-content-center mx-auto ">
            <ContractData drizzle={drizzle} drizzleState={drizzleState} contract={propAddress} method="proposals" methodArgs={[tokenId]} 
              render={data => (
                <>
                  <p className="sell-text card-title text-center">Complete Listing:&nbsp;<span className="amount-number">{Web3.utils.fromWei(`${data.reSalePrice}`,'ether')}</span>&nbsp;MANA</p>
                </>
              )}
            />
          </div> 
          <div className="modal-footer">
            <button className="btn btn-block btn-success join-form-btn" key="submit" type="button" onClick={handleSubmit} style={{ fontSize: 16 }} > 
              Sell NFT
            </button>
          </div>
          <style jsx> {` 
            .sell-text{font-weight:400;color:black;font-size:1rem;font-family: Poppins;}
            .amount-number {color:#66a3ff;font-family: Poppins} 
            `}    
          </style>
        </Form>
      )}
    />
  )
}

export default SellAsset;


