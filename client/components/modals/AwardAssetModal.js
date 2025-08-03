import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Col, Container, Button, Row, Form } from "shards-react";
import Web3 from "web3";
import ClaimBtn from "../buttons/ClaimAssetBtn";

const AwardAsset =  ({ drizzle, drizzleState, propAddress, tokenId }) => { 

  const [deposits, setDespositInfo] = useState([]);
  //const [winner, setWinner] = useState(null);

  useEffect(() => {
    fetchProposalInfo();
  }, [])

  const fetchProposalInfo = async () => { 
      let state = drizzle.store.getState()
      if(state.drizzleStatus.initialized){
      const proposalContract = await drizzle.contracts[`${propAddress}`];
      const depositInfoLength = await proposalContract.methods.countDepositers().call();
      const propData = await proposalContract.methods["proposals"](`${tokenId}`).call();
      const convertedListPrice= Web3.utils.fromWei(`${propData.listPrice}`,'ether');

      let i;
      let depositerArray = [];
        for (i = 0; i < depositInfoLength; i++) {
          const depositer = await proposalContract.methods.depositersArray([i]).call();
          const depositAmount = await proposalContract.methods.deposits(depositer).call();
          let depositerAmount = Web3.utils.fromWei(depositAmount,'ether');
          let listPricePercent = ((depositerAmount / convertedListPrice) * 100).toFixed(0);
          depositerArray.push([i, depositer, listPricePercent]);
          setDespositInfo(depositerArray);
      }  
  }
   return console.log('Loading....')
  };

const select = async () => {
  const account = await drizzleState.accounts[0];
  const contract = await drizzle.contracts[`${propAddress}`];
  try {
      contract.methods["weightContributors"].cacheSend({from:`${account}`, gas:3000000});
    } catch (err) {
      console.error("Err:", err)
    }
};

let state = drizzle.store.getState();
const contract =  drizzle.contracts[`${propAddress}`];
const dataKey = contract.methods.winningContributor.cacheCall();
const displayData = state.contracts[`${propAddress}`].winningContributor[dataKey];
let winner = displayData && displayData.value;
console.log(winner)

  return (
    <>
      {winner == 'null' ?
        <div>
          <div>
            <Container className="">
              <h5 className="text-center mb-1">
                Owners
              </h5>  
              <div className="funds-info-container border border-secondary rounded px-3 my-2">
              <Row className="card-text justify-content-center mt-1"> 
                {deposits.map(deposit => (
                  <div className=""  key={deposit[0]} >
                    <Container className="mt-1">
                      <Row> 
                        <Col>
                          <p className="addresses-text mb-1">
                            {deposit[1]} 
                          </p>
                          <p className="probability-text text-center mb-1 border-top border-primary">
                            Probability:&nbsp;<span className="probability-percent">&nbsp;{deposit[2]}%</span>
                          </p>
                        </Col>
                      </Row>
                    </Container>
                  </div>
                ))}
              </Row>
              </div>
            </Container>
          </div>
          <Container>
            <Row className=" mt-2 mb-1 justify-content-center">
              <Form onSubmit={select}>
                <Button size="md" theme="dark" className="mt-2 mx-auto"
                  key="submit"
                  type="button"
                  onClick={select} 
                  style={{ fontSize: 14 }}
                >
                  Award DNA
                </Button>
              </Form>
            </Row>
          </Container>
          <style jsx> 
              {` 
                .addresses-text{font-size:.9rem;font-weight:300;}
                .funds-info-container{background-color:#ecf2f9;}
                .card-text{font-family:Poppins;font-size:1rem;}
                .probability-percent{font-size:.9rem;color:#007bff;}
                .probability-text{font-size:.9rem;color:#000;font-weight:300;}
              `}    
          </style>
        </div>       
      :
        <div>
          <ClaimBtn drizzle={drizzle} drizzleState={drizzleState} propAddress={propAddress} winner={winner} />
        </div>
      }
  </>
  )
}

const mapStateToProps = (state) => ({
  proposalBalance: state.appReducers.proposalBalance
})

export default connect(mapStateToProps, null)(AwardAsset);



