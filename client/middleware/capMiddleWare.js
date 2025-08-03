import { EventActions } from "@drizzle/store";
import { toast } from 'react-toastify';

const GET_PROP_ADDRESS ='GET_PROP_ADDRESS';

export const joinTransactionSaga = store => next => action => {
  if (action.type === "TX_SUCCESSFUL") { 
    const transactionHash = action.txHash
    const transactionNumber = `${transactionHash}`
    toast(transactionNumber, { position: toast.POSITION.BOTTOM_LEFT,className:'successful-transaction' })
  }
  return next(action)
}

const deposit = async (propContract,convertedContribution, account) => {
 propContract.methods["deposit"].cacheSend(convertedContribution,{from:`${account}`, gas:3000000}) 
}


export const depositCurrency = store => next => async (action) => {
  if (action.type === "RUN_DEPOSIT_SAGA") {
    const { accounts } = store.getState();
    const account = accounts[0];
    const { convertedContribution, propAddress, drizzle } = action;
    const propContract = await drizzle.contracts[`${propAddress}`];
    return propContract.methods["deposit"].cacheSend(convertedContribution,{from:`${account}`, gas:3000000}); 
    }
  return next(action)
}

export const contractEventSaga = lastSeenEventId => store => next => action => {
  if (action.type === EventActions.EVENT_FIRED) {
    if (action.event.id !== lastSeenEventId) {
      lastSeenEventId = action.event.id
       const message = action.event.returnValues._message
       const display = `${message}`
       if(action.event.event === "ContributionSuccess"){
        const poolDepth = action.event.returnValues.currentContractBalance
        store.dispatch({type:"PROPOSAL_BALANCE", balance:`${poolDepth}`})
       }
       if(action.event.event === "AssetNomination"){
        const propAddress = action.event.returnValues._proposalAddress
        const proposalAddress = `${propAddress}`
        store.dispatch({type:"GOT_PROP_ADDRESS", proposalAddress:proposalAddress})
        }
       toast.info(display, { position: toast.POSITION.TOP_RIGHT })
    }
  }
  return next(action)
}


