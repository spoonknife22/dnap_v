import React from 'react';
import { newContextComponents } from "@drizzle/react-components";
import { Button, Form } from "shards-react";

const { ContractForm } = newContextComponents;

const Purchase = ({drizzle, drizzleState, propAddress, tokenId }) => {
  const account = drizzleState.accounts[0];
  
  return(
      <ContractForm
        drizzle={drizzle}
        drizzleState={drizzleState}
        contract={propAddress}
        method="completePurchase" 
        sendArgs={{ from:account}}
        render={({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <div className="justify-content-center mx-auto ">
            <p className="purchase-text card-title text-center">Complete Purchase</p>
          </div> 
          <div className="modal-footer">
            <button className="btn btn-block btn-success join-form-btn" key="submit" type="button" onClick={handleSubmit} style={{ fontSize: 16 }} > 
              Purchase
            </button>
          </div>
          <style jsx> {` 
            .purchase-text{font-weight:300;color:black;font-size:1.1rem;font-family: Poppins;} 
            `}    
          </style>
        </Form>
      )}
    />
  )
}

export default Purchase;