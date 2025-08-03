import React from "react";
import { connect } from 'react-redux';
import { Button, Progress, Row, Container, Col } from "shards-react";
import Web3 from "web3";
import WithDraw from '../buttons/WithDrawBtn.js';
//import UpdateProp from '../buttons/UpdatePropBtn.js';
import UpdateForm from './UpdateForm.js';
import { toast } from 'react-toastify';
import { Loader } from 'rimble-ui';
import { newContextComponents } from "@drizzle/react-components";


const { ContractData } = newContextComponents;

const Input = ({ value, onChange, placeholder }) => (
  <div>
    <input className="form-control form-control-sm" value={value} onChange={onChange} placeholder={placeholder}  /> 
  </div>
) 

class ContributeForm extends React.Component {
  constructor(props){
    super(props);
    this.approve = this.approve.bind(this);
    this.deposit = this.deposit.bind(this);
    this.state = {
      contribution:""
    }
  }
  
updateField = (fieldName, e) => {
  const newState = {}
  newState[fieldName] = e.target.value
  this.setState(newState)
}

approve = async (e) => {
  e.preventDefault();
  let web3 = new Web3(Web3.givenProvider);
  const { drizzle, drizzleState, propAddress, proposalStorage, tokenId, assetPrice, nftAddress, getStackId } = this.props;
  const { contribution } = this.state;
  const account = await drizzleState.accounts[0];
  const memberBool = await drizzle.contracts.UserStorage.methods.addresses(account).call();
  const propBalance = await proposalStorage.methods.getSummary(`${tokenId}`).call();
  const currentPropBalance = Web3.utils.fromWei(`${propBalance}`,'ether');
  const convertedPrice =  Web3.utils.fromWei(`${assetPrice}`,'ether');
  const remainingBalance =  `${convertedPrice}` - `${currentPropBalance}`;
  const convertedContribution =  Web3.utils.toWei(`${contribution}`,'ether');

  for (let key in this.state) {    
    if (!this.state[key]) {
      return toast.warning(`You must fill in an amount ${key}!`,{ position: toast.POSITION.TOP_RIGHT })
    } 
    else if (contribution > remainingBalance) {
      return toast.warning(`Your contribution of ${contribution} is greater than the amount required.`,{ position: toast.POSITION.TOP_RIGHT })
    }
  }
  if(memberBool && propAddress !== null) {
  //if(memberBool) {
    const manaContract = await drizzle.contracts.MANAToken; 
    const manaContribution = async () => await (manaContract.methods["approve"].cacheSend(propAddress,convertedContribution,{from:`${account}`, gas:300000}));
  try { 
    const stackId = await manaContribution();
    getStackId(stackId, convertedContribution);

  } catch (err) {
    return toast.error(`Sorry, MANA Approval did not go through: ${err}`,{ position: toast.POSITION.TOP_RIGHT })
  }
}
else if(!memberBool) {
    return toast.error(`Sorry, you must register to deposit MANA`,{ position: toast.POSITION.TOP_RIGHT })
  }
}


deposit = async () => {
  const { propAddress, drizzle, convertedContribution, drizzleState, stackId, processingDone, getDepStackId, approvedAmount } = this.props;
  const account = await drizzleState.accounts[0];
  const { transactionStack, transactions } = drizzleState;
  const propContract = await drizzle.contracts[`${propAddress}`];
  const manaContract = await drizzle.contracts.MANAToken; 
  const manaApproved = await (manaContract.methods["allowance"](`${account}`,`${propAddress}`).call());

  const txHash = transactionStack[stackId];
  if (!txHash) {
    //if(approvedAmount) {
  if(manaApproved) {
      // const propContract = await drizzle.contracts[`${propAddress}`];
      // const manaContract = await drizzle.contracts.MANAToken; 
      // const manaApproved = await (manaContract.methods["allowance"](`${account}`,`${propAddress}`).call());
      const manaDeposit = async () => await propContract.methods["deposit"].cacheSend(`${manaApproved}`,{from:`${account}`, gas:3000000});
      try { 
        const depStackId = await manaDeposit();
        //getDepStackId(depStackId,approvedAmount);
        getDepStackId(depStackId, manaApproved);
      } catch (err) {
        return toast.error(`Sorry, deposit did not go through: ${err}`,{ position: toast.POSITION.TOP_RIGHT })
      }
    }
    else {
      toast(`Approval Transaction: ${transactions[txHash].status}`, { position: toast.POSITION.BOTTOM_LEFT})
    }
    }
  if(txHash){
    if(processingDone){
      if(transactions[txHash] && transactions[txHash].status) {
        const propContract = await drizzle.contracts[`${propAddress}`];
        const manaContract = await drizzle.contracts.MANAToken; 
        const manaApproved = await (manaContract.methods["allowance"](`${account}`,`${propAddress}`).call());
        const manaDeposit = async () => await propContract.methods["deposit"].cacheSend(`${manaApproved}`,{from:`${account}`, gas:3000000});
        try { 
          const depStackId = await manaDeposit();
          getDepStackId(depStackId, manaApproved);
          //getDepStackId(depStackId,convertedContribution);
        } catch (err) {
          return toast.error(`Sorry, deposit did not go through: ${err}`,{ position: toast.POSITION.TOP_RIGHT })
        }
      }
      else {
        toast(`Approval Transaction: ${transactions[txHash].status}`, { position: toast.POSITION.BOTTOM_LEFT})
      }
    }
  }

}



  render() {
    const { drizzle, drizzleState, assetPrice, contractBalance, transactionProcessing, propAddress, stackId, tokenId, convertedContribution, depStackId, approvedAmount, depositAmount, prevOrderStatus, orderId, orderStatus, manaApproved, storedOrderId } = this.props;
    const { transactionStack } = drizzleState;
    const txHash = transactionStack[stackId];
    const depTxHash = transactionStack[depStackId];
   
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
              <div className="">
                <UpdateForm drizzleState={drizzleState} drizzle={drizzle} propAddress={propAddress} prevOrderStatus={prevOrderStatus} orderId={orderId}/>
                <WithDraw depositAmount={depositAmount} drizzleState={drizzleState} drizzle={drizzle} propAddress={propAddress} />
                <div className="funds-info-container">
                <Container className="funds-info-container mt-2">
                  <Row>
                    <Col sm="12" md="4">
                      <p className="amount-text mt-1 mb-1 text-left" >Pool Depth</p>
                    </Col>
                    <Col sm="12" md="4">
                      <p className="amount-text mt-1 mb-1 text-center">{minRange}</p>
                    </Col>
                    <Col sm="12" md="4">
                      <p className="amount-text mt-1 mb-1 text-center">MANA</p>
                    </Col>
                  </Row>  
                  <Row>
                    <Col sm="12" md="4">
                      <p className="amount-text mt-1 mb-1 text-left" >Funds Needed</p>
                    </Col>
                    <Col sm="12" md="4">
                    <p className="amount-text mt-1 mb-1 text-center">{fundsNeeded}</p>
                    </Col>
                    <Col sm="12" md="4">
                      <p className="amount-text mt-1 mb-1 text-center">MANA</p>
                    </Col>
                  </Row>
                  <Row>
                    <ContractData drizzle={drizzle} drizzleState={drizzleState} contract={propAddress} method="proposals" methodArgs={[tokenId]} 
                      render={data => (
                        <>
                          <Col sm="12" md="4">
                            <p className="amount-text mt-1 mb-1 text-left" >Resale Price</p>
                          </Col>
                          <Col sm="12" md="4">
                          <p className="amount-text mt-1 mb-1 text-center">{Web3.utils.fromWei(`${data.reSalePrice}`,'ether')}</p>
                          </Col>
                          <Col sm="12" md="4">
                            <p className="amount-text mt-1 mb-1 text-center">MANA</p>
                          </Col>
                        </>
                      )} >
                    </ContractData>
                  </Row>  
                </Container>
                </div>
              </div>
              <Progress className="mt-2" value={minRange} max={maxRanger} ></Progress>
            </div>
          } 
         
        </div>
        {/* {!txHash && approvedAmount == 0 ? */}
        {!txHash && manaApproved == 0 ?
        //start of txHash
            <form onSubmit={this.approve}>
              <Row className="mt-3 justify-content-center contribute-form-dialog">
                <div className="modal-footer justify-content-center">
                  <div className="contribute-form-dialog ">    
                  <Input 
                    title="Contribute"
                    placeholder="MANA" 
                    onChange={e => this.updateField("contribution", e)} 
                  />
                  </div> 
                  <div>
                    <Button className="contribute-form-btn px-3 py-2" type="submit" onClick={this.approve} theme="success" >
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
                      <form onSubmit={this.deposit}>
                      <Row className="mt-1 justify-content-center contribute-form-dialog">
                        <div className="modal-footer justify-content-center">
                          <div>
                            {!transactionProcessing && !depTxHash ? 
                              <Button className="btn-block btn-success contribute-form-btn"  onClick={this.deposit} theme="success" >
                                Deposit&nbsp;{Web3.utils.fromWei(`${approvedAmount}`,'ether')}&nbsp;MANA
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
                                      <>
                                      <div className="modal-footer text-deposit-complete justify-content-center">
                                        Deposit of&nbsp;{Web3.utils.fromWei(`${manaApproved}`,'ether')}&nbsp;MANA Complete
                                      </div>
                                        <script>
                                          {setTimeout(() => window.location.reload(), 5000)}
                                        </script>
                                      </>
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
            //If Token Already Approved
           else if(manaApproved != 0) {
              return(
                <div className="modal-footer text-deposit-complete justify-content-center">
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
                          <>
                            <div className="modal-footer text-deposit-complete text-center justify-content-center">
                              Deposit of&nbsp;{Web3.utils.fromWei(`${manaApproved}`,'ether')}&nbsp;MANA Complete
                            </div>
                            <script>
                              {setTimeout(() => window.location.reload(), 5000)}
                            </script>
                          </>
                        )
                      case 'error':
                        return'error'
                      default:
                        return null;
                    }
                  }
                  else {
                    return (
                        <div>
                          <Row className="mt-2 justify-content-center contribute-form-dialog">
                            <ContractData drizzle={drizzle} drizzleState={drizzleState} contract="MANAToken" method="allowance" methodArgs={[drizzleState.accounts[0], `${propAddress}`]} 
                              render={data => (
                                <>
                                  <p className="mb-1 contribute-form-dialog">Approved For Deposit: <span className="locked-amount-number">{Web3.utils.fromWei(`${data}`,'ether')}</span> MANA</p>
                                </>
                              )}
                            />
                          </Row>
                          <Row>
                          <Button className="btn-block btn-success contribute-form-btn"  onClick={this.deposit} theme="success" >
                            Deposit&nbsp;{Web3.utils.fromWei(`${manaApproved}`,'ether')}&nbsp;MANA
                          </Button>
                        </Row>    
                        </div>
                      )
                    }
                  //End MANA Deposit depTxHash produced
                  })()}
                </div>   
              )
            }
            })()}
          </div>
        }
          <style jsx>
              {`  
              .funds-info-container{background-color:#ecf2f9;}
              .resale-number{color:#ff471a;font-weight:400}
              .contribution-modal{font-family: Poppins;}
              .amount-text {font-size:.9rem;color:#000;font-family: Poppins;}
              .amount-number {font-size:.9rem;color:#66a3ff;font-family: Poppins}
              .amount-needed-number{font-size:.9rem;color:#129857;font-family: Poppins}
              .locked-amount-number {font-size:1rem;color:#66a3ff;font-family: Poppins}
              .contribute-form-btn {font-family: Poppins;letter-spacing:5.5px;padding:.6rem;}
              .contribute-form-dialog {font-family: Poppins; font-size:1rem;}
              .text-deposit-complete {font-family: Poppins; font-size:1rem;color:#14af64}
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
   }
}
//}
const mapStateToProps = (state) => ({
  contribComplete: state.appReducers.contribComplete,
  proposalStorage: state.appReducers.proposalStorage,
  contractBalance: state.appReducers.contractBalance,
  nftAddress: state.appReducers.nftAddress,
  transactionProcessing: state.appReducers.transactionProcessing,
  stackId: state.appReducers.stackId,
  depStackId: state.appReducers.depStackId,
  convertedContribution: state.appReducers.convertedContribution,
  processingDone: state.appReducers.processingDone,
  approvedAmount: state.appReducers.approvedAmount,
  manaApproved: state.appReducers.manaApproved,
  depositAmount:state.appReducers.depositAmount
})

const mapDispatchToProps = (dispatch) => ({
  //gotContractBalance: (proposalBalance) => dispatch({ type:'PROPOSAL_BALANCE', balance:`${proposalBalance}` }),
  contributionComplete: () => dispatch({ type: "CONTRIB_COMPLETE", contribComplete: true }),
  getStackId: (stackId,convertedContribution) => dispatch({ type: "GOT_STACK_ID", stackId:stackId, convertedContribution:convertedContribution}),
  getDepStackId: (depStackId,manaApproved) => dispatch({ type: "GOT_DEP_STACK_ID", depStackId:depStackId, manaApproved:manaApproved}),
  runContributeSaga: (propAddress,drizzle,convertedContribution) => dispatch({ type: "RUN_DEPOSIT_SAGA",convertedContribution:convertedContribution, propAddress:propAddress, drizzle:drizzle }),
});


export default connect(mapStateToProps, mapDispatchToProps)(ContributeForm);


