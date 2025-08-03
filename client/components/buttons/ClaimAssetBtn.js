import React from 'react';
import { newContextComponents } from "@drizzle/react-components";
import { Form } from "shards-react";

const { ContractForm, ContractData } = newContextComponents;

const ClaimBtn = ({drizzle, drizzleState, propAddress, winner }) => {
  const account = drizzleState.accounts[0];

  return(
    <>
    {account == winner ?
      <div className="p-3 mt-3 border border-success rounded">
        <div>
          <ContractData drizzle={drizzle} drizzleState={drizzleState} contract={propAddress} method="winningContributor" 
            render={data => (
              <>
                <p className="mb-1 text-md font-weight-bold sell-text text-center border-bottom border-success">DNA Awarded To</p>
                <p className="text-truncate text-sm font-weight-normal sell-text text-center">{data}</p>
              </>
            )}
          />
        </div> 
        <ContractForm
          drizzle={drizzle}
          drizzleState={drizzleState} 
          contract={propAddress}
          method="claimAsset" 
          sendArgs={{ from:account}}
          render={({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <div>
              <button className="btn btn-block btn-success" key="submit" type="button" onClick={handleSubmit} style={{ fontSize: 16 }} > 
                Claim Asset
              </button>
            </div>
          </Form>
          )}
        />
      </div>
    :
      <div className="p-3 mt-3 border border-primary rounded">
        <ContractData drizzle={drizzle} drizzleState={drizzleState} contract={propAddress} method="winningContributor" 
          render={data => (
            <>
              <p className="mb-1 ext-md font-weight-bold sell-text text-center border-bottom border-primary">DNA Awarded To</p>
              <p className="mb-1 text-truncate text-sm font-weight-normal sell-text text-center">{data}</p>
            </>
          )}
        />
      </div> 
 
    }       
    </>
  )
}

export default ClaimBtn;

