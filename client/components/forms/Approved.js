import React from 'react';
import { Button, Progress, Row } from "shards-react";
import Web3 from "web3";
import { toast } from 'react-toastify';
import { Loader } from 'rimble-ui';
import { newContextComponents } from "@drizzle/react-components";

const { ContractData } = newContextComponents;

const Approved = ({ props, deposit }) => {

    const { drizzle, drizzleState, assetPrice, contractBalance, transactionProcessing, propAddress, stackId, processingDone, convertedContribution, depStackId, approvedMana } = props;
    const { transactionStack } = drizzleState;
    const txHash = transactionStack[stackId];
    const depTxHash = transactionStack[depStackId];

    // deposit = async () => {
    //   const { propAddress, drizzle, drizzleState, stackId, processingDone, getDepStackId, approvedMana } = this.props;
    //   const account = await drizzleState.accounts[0];
    //   const { transactionStack, transactions } = drizzleState;
    
    //   const propContract = await drizzle.contracts[`${propAddress}`];
    //   const manaDeposit = async () => await propContract.methods["deposit"].cacheSend(approvedMana,{from:`${account}`, gas:3000000});
    //   try { 
    //     const depStackId = await manaDeposit();
    //     getDepStackId(depStackId,approvedMana);
    //     toast(`Approval Transaction: ${transactions[txHash].status}`, { position: toast.POSITION.BOTTOM_LEFT})
    //   } catch (err) {
    //     return toast.error(`Sorry, deposit did not go through: ${err}`,{ position: toast.POSITION.TOP_RIGHT })
    //   }
     
    
    // }

    if(contractBalance === null){
      return (
      <div className="mx-auto">  
       ContributeForm 105
        <Loader className="mx-auto" color="#007bff" size="40px" />
      </div>
      )
    }
    if(contractBalance && propAddress){
      let maxRanger =  Web3.utils.fromWei(`${assetPrice}`,'ether');
      let currentContractBalance = Web3.utils.fromWei(`${contractBalance}`,'ether');
      let minRange = currentContractBalance;
      let fundsNeeded = maxRanger - minRange;

      return (
        <div>
          <div className="contribution-modal">
            {propAddress === 'undefined' || propAddress === null ? 
            <div className="mx-auto">   
              <Loader className="mx-auto" color="#007bff" size="40px" />
            </div>
          :
            <div>
              <ContractData drizzle={drizzle} drizzleState={drizzleState} contract="MANAToken" method="allowance" methodArgs={[drizzleState.accounts[0], `${propAddress}`]} 
                render={data => (
                  <>
                    <p>Your Approved Funds: <span className="locked-amount-number">{Web3.utils.fromWei(`${data}`,'ether')}</span> MANA</p>
                  </>
                )}
              />
              <p className="amount-text mt-3 mb-1 text-left" >Funds Needed: <span className="amount-number">{fundsNeeded}</span> MANA</p>
              <p className="amount-text mt-1 mb-1 text-left" >Pool Depth: <span className="amount-number">{minRange}</span> MANA</p>
              <Progress value={minRange} max={maxRanger} ></Progress>
              <form onSubmit={deposit}>
                      <Row className="mt-1 justify-content-center contribute-form-dialog">
                        <div className="modal-footer justify-content-center">
                          <div>
                            {!transactionProcessing && !depTxHash ? 
                              <Button className="btn-block btn-success contribute-form-btn"  onClick={deposit} theme="success" >
                                Deposit&nbsp;{Web3.utils.fromWei(`${approvedMana}`,'ether')}&nbsp;MANA
                              </Button>
                            :
                            //MANA Deposit depTxHash produced
                            <div>
                              {(() => {
                                if(drizzleState.transactions[depTxHash]) {
                                const depStatus = drizzleState.transactions[depTxHash].status;
                                switch (depStatus) {
                                  case 'pending':
                                    return (
                                      <div className="mx-auto">   
                                        <Loader className="mx-auto" color="#007bff" size="40px" />
                                      </div>   
                                    )
                                  case 'success':
                                    return  (
                                      <div className="modal-footer text-deposit-complete justify-content-center">
                                        Deposit of&nbsp;{Web3.utils.fromWei(`${approvedMana}`,'ether')}&nbsp;MANA Complete
                                      </div>
                                    )
                                  case 'error':
                                    return'error'
                                  default:
                                    return null;
                                }
                              }
                              //End MANA Deposit depTxHash produced
                              })()}
                            </div>
                            }
                          </div>
                        </div>
                      </Row>
                    </form>  
            </div>
            
          } 
          </div>
  

          <style jsx>
              {`  
              .contribution-modal{font-family: Poppins;}
              .amount-text {font-size:.9rem;color:#000;font-family: Poppins;}
              .amount-number {font-size:.9rem;color:#66a3ff;font-family: Poppins}
              .locked-amount-number {font-size:1rem;color:#66a3ff;font-family: Poppins}
              .contribute-form-btn {font-family: Poppins;letter-spacing:5.5px;padding:.6rem;}
              .contribute-form-dialog {font-family: Poppins; font-size:1rem;}
              .text-deposit-complete {font-family: Poppins; font-size:1rem;color:#17c671;}
              `}                
          </style>
        </div>
      )
  }
  else{
    return(
      <div className="mx-auto">   
        contributeform 202
        <Loader className="mx-auto" color="#007bff" size="40px" />
      </div>     
        )
      }
  // }
}






export default Approved;



























