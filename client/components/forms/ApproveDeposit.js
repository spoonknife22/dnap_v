
import React from "react";
import { connect } from 'react-redux';
import { Button, Progress, Row } from "shards-react";
import Web3 from "web3";
import { toast } from 'react-toastify';
import { Loader } from 'rimble-ui';
import { newContextComponents } from "@drizzle/react-components";

//import Approve from "./Approve.js";

const { ContractData } = newContextComponents;

const Input = ({ value, onChange, placeholder }) => (
  <div>
    <input className="form-control form-control-sm" value={value} onChange={onChange} placeholder={placeholder}  /> 
  </div>
) 


//export default class ApproveDeposit extends React.Component {
const ApproveDeposit = ({ props, approve, updateField, deposit }) => {

  // render() {
    const { drizzle, drizzleState, assetPrice, contractBalance, transactionProcessing, propAddress, stackId, processingDone, convertedContribution, depStackId, approvedMana } = props;
    const { transactionStack } = drizzleState;
    const txHash = transactionStack[stackId];
    const depTxHash = transactionStack[depStackId];
    console.log(approvedMana)

    if(contractBalance === null){
      return (
      <div className="mx-auto">  
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
              <p className="amount-text mt-3 mb-1 text-left" >Funds Needed: <span className="amount-number">{fundsNeeded}</span> MANA</p>
              <p className="amount-text mt-1 mb-1 text-left" >Pool Depth: <span className="amount-number">{minRange}</span> MANA</p>
              <Progress value={minRange} max={maxRanger} ></Progress>
            </div>
          } 
          </div>
        {!txHash ?
        //start of txHash
            <form onSubmit={approve}>
              <Row className="mt-3 justify-content-center contribute-form-dialog">
                <div className="modal-footer justify-content-center">
                  <div className="contribute-form-dialog ">
                  <Input 
                    title="Contribute"
                    placeholder="MANA" 
                    onChange={e => updateField("contribution", e)} 
                    />
                  </div> 
                  <div>
                    <Button className="contribute-form-btn" type="submit" onClick={approve} theme="success" >
                      Approve
                    </Button>
                  </div>
                </div>
              </Row>
            </form>
          :
          //Once MANA Approve txhash produced
          <div>
            {(() => {
              if(drizzleState.transactions[txHash]) {
              const status = drizzleState.transactions[txHash].status;
              switch (status) {
                case 'pending':
                return(
                  <div className="mx-auto">   
                    <Loader className="mx-auto" color="#007bff" size="40px" />
                  </div>    
                )
                case 'success':
                  return (
                    <div>
                      <Row className="mt-2 justify-content-center contribute-form-dialog">
                        <ContractData drizzle={drizzle} drizzleState={drizzleState} contract="MANAToken" method="allowance" methodArgs={[drizzleState.accounts[0], `${propAddress}`]} 
                          render={data => (
                            <>
                              <p className="mb-1 contribute-form-dialog">Approved For Deposit: <span className="locked-amount-number">{Web3.utils.fromWei(`${data}`,'ether')}</span> MANA</p>
                            </>
                            //End of MANA Approve!txhash
                          )}
                        />
                      </Row>
                      <form onSubmit={deposit}>
                      <Row className="mt-1 justify-content-center contribute-form-dialog">
                        <div className="modal-footer justify-content-center">
                          <div>
                            {!transactionProcessing && !depTxHash ? 
                              <Button className="btn-block btn-success contribute-form-btn"  onClick={deposit} theme="success" >
                                Deposit&nbsp;{Web3.utils.fromWei(`${convertedContribution}`,'ether')}&nbsp;MANA
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
                                        Deposit of&nbsp;{Web3.utils.fromWei(`${convertedContribution}`,'ether')}&nbsp;MANA Complete
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
                  )
                case 'error':
                  return 'error';
                default:
                  return null;
              }
            }
            {
              return(
                <div className="mx-auto">  
                  <Loader className="mx-auto" color="#007bff" size="40px" />
                </div>   
              )
            }
            })()}
          </div>
        }

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
   //}
}

export default ApproveDeposit;
