  
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Web3 from 'web3';
import { Loader } from 'rimble-ui';
import { Row, Progress } from "shards-react";

const ForSaleInnerModal = ({ drizzle, propAddress, listPrice, startPay }) => {
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

if(!startPay){
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
        <style jsx>
          {` 
            .progress{background-color:red;}
            .card-text{font-family:Poppins;font-size:1rem;}
            .purchase-price{color:#007bff;}
            .deposit-info{color:#000;font-weight:400;}
            .deposit-text{font-size:.8rem;color:#5A6169;}
          `}                
        </style>
      </>
        );    
      }   
      else if(startPay){
      return(
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
                    <p className="deposit-text mb-1">
                      Contribution:&nbsp;<span className="purchase-price">{Web3.utils.fromWei(deposit[2],'ether')}</span>&nbsp;MANA
                    </p>
                  </div>
                </Row>
              </div>
            ))}
            </div>
          </Row>
        :
          <div className="align-items-center">   
            <Loader className="mx-auto" color="#007bff" size="40px" />
          </div>
        } 
      <style jsx>
        {` 
          .card-text{font-family:Poppins;font-size:1rem;}
          .purchase-price{color:#007bff;}
          .deposit-info{color:#000;font-weight:400;}
          .deposit-text{font-size:.9rem;color:#000;}
        `}                
      </style>
      </>
      )
    }

  } 

const mapStateToProps = (state) => ({
  listPrice:state.appReducers.listPrice
})

export default connect(mapStateToProps, null)(ForSaleInnerModal);
      
 