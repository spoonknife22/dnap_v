import React, { useState, useEffect } from 'react';
import { newContextComponents } from "@drizzle/react-components";
import { Button, Form, Container, Row, Progress } from "shards-react";
import Web3 from "web3";
import Accordion from 'react-bootstrap/Accordion';
import { connect } from 'react-redux';
import { Loader } from 'rimble-ui';


const { ContractForm, ContractData } = newContextComponents;

const SecondSellAsset = ({drizzle, drizzleState, propAddress, tokenId, listPrice }) => {
  const account = drizzleState.accounts[0];

  const [deposits, setDespositInfo] = useState([]);

  useEffect(() => {
    fetchProposalInfo();
  }, [])

  const fetchProposalInfo = async () => { 
      let state = drizzle.store.getState()
      if(state.drizzleStatus.initialized){

      const proposalContract = await drizzle.contracts[`${propAddress}`];
      const depositInfoLength = await proposalContract.methods.countDepositers().call();

      let i;
      let depositerArray = [];

      for (i = 0; i < depositInfoLength; i++) {
        const depositer = await proposalContract.methods.depositersArray([i]).call();
        const depositAmount = await proposalContract.methods.deposits(depositer).call();
        depositerArray.push([i, depositer, depositAmount]);
        setDespositInfo(depositerArray);
    }
   
  }
   return 'Loading....'
  }


return (   
      <>   
        {deposits && listPrice ?   
            <Row className="card-text justify-content-center mt-1"> 
              <div>
                <Row>
                  <h5 className="mb-1">
                    Owners:
                  </h5>
                </Row>
              {deposits.map(deposit => (
                <div className="deposit-info" key={deposit[0]} >
                  <Row className="border-top"> 
                    <div>  
                      <p className="mb-1">
                        {deposit[1]} 
                      </p>
                      <p className="deposit-text text-center mb-0">
                        Contribution
                      </p>
                      <Progress className="mb-3" multi >
                        <Progress bar theme="success"  max={Web3.utils.fromWei(`${listPrice}`,'ether')}  value={Web3.utils.fromWei(deposit[2],'ether')} >{Web3.utils.fromWei(deposit[2],'ether')}&nbsp;MANA</Progress>
                        <Progress bar theme="secondary" max={Web3.utils.fromWei(`${listPrice}`,'ether')} value={Web3.utils.fromWei(`${listPrice}`,'ether') - Web3.utils.fromWei(deposit[2],'ether')} />
                      </Progress>
                    </div>
                  </Row>
                </div>
              ))}
               <Row className="border-top justify-content-center">
                  <div className="mt-2">
                    Purchase Price:&nbsp;<span className="purchase-price">{Web3.utils.fromWei(`${listPrice}`,'ether')}</span>&nbsp;MANA
                  </div>
                </Row>
              </div>
            </Row>
          :
            <div className="align-items-center">   
              <Loader className="mx-auto" color="#007bff" size="40px" />
            </div>
          } 
          <Container>
            <Accordion defaultActiveKey="1">
              <Accordion.Toggle className="m-auto" as={Button} size="sm" variant="link" eventKey="0" outline theme="light">
              <div className="m-auto">Details</div>
              </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <div className="mb-3">
                    <small className="text-muted mr-4">The first sale has expired. Submit the second listing at the original purchase price.</small>
                  </div>
                </Accordion.Collapse>
              </Accordion>
              <ContractForm
                drizzle={drizzle}
                drizzleState={drizzleState}
                contract={propAddress}
                method="sellAsset" 
                sendArgs={{ from:account}}
                render={({ handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                  <div className="justify-content-center mx-auto">
                    <ContractData drizzle={drizzle} drizzleState={drizzleState} contract={propAddress} method="proposals" methodArgs={[tokenId]} 
                      render={data => (
                        <>
                          <p className="sell-text card-title text-center">New Sale Price:&nbsp;<span className="amount-number">{Web3.utils.fromWei(`${data.listPrice}`,'ether')}</span>&nbsp;MANA</p>
                        </>
                      )}
                    />
                  </div>
                  <div className="modal-footer">
                    <button className="btn btn-block btn-success join-form-btn" key="submit" type="button" onClick={handleSubmit} style={{ fontSize: 16 }} > 
                      Relist NFT
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
        </Container>
      </>
    ) 
}


const mapStateToProps = (state) => ({
  listPrice:state.appReducers.listPrice
})



export default connect(mapStateToProps, null)(SecondSellAsset);
