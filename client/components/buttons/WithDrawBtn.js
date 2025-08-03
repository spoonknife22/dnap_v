import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { Button,Row } from "shards-react";
import { newContextComponents } from "@drizzle/react-components";
import Web3 from "web3";
const { ContractForm } = newContextComponents;

const WithDraw = ({ depositAmount, drizzle, drizzleState, propAddress }) => { 
if(depositAmount > 0) {  
return (
    <Accordion defaultActiveKey="1">
      <Row className=" mt-2 mb-1 justify-content-center">
        <div>
          <Accordion.Toggle as={Button} className="px-2.5 py-1.5" variant="link" eventKey="0" theme="light">
          <div className="amount-text" >Your Deposit: <span className="amount-number">{Web3.utils.fromWei(`${depositAmount}`,'ether')}</span> MANA</div>
          </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Row className="justify-content-center">
                <ContractForm
                  drizzle={drizzle}
                  drizzleState={drizzleState}
                  contract={propAddress}
                  method="withdraw"
                  sendArgs={{ from:drizzleState.accounts[0]}}
                  render={({ handleSubmit }) => (
                    <Button outline theme="danger" size="sm" className="mt-2 mx-auto"
                      key="submit"
                      type="button"
                      style={{ fontSize: 12 }}
                      onClick={handleSubmit}
                    >
                      withdraw {Web3.utils.fromWei(`${depositAmount}`,'ether')} MANA
                    </Button>
                  )}
                /> 
              </Row>
            </Accordion.Collapse>
        </div> 
      </Row>
      <style jsx> {` 
          .details-btn:hover{font-family: Poppins;font-size:.9rem;}
          .amount-text {font-size:.9rem;color:#000;font-family: Poppins;}
          .amount-number {font-size:.9rem;color:#66a3ff;font-family: Poppins}
        `}    
      </style>
    </Accordion>
  )
}
  else  {
    return <></>;
  }

}

export default WithDraw;