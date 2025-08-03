import { combineReducers } from 'redux';
import { drizzleReducers } from '@drizzle/store';

const NOM_TX_PROCESSING = 'NOM_TX_PROCESSING'
const TX_PROCESSING_DONE = "TX_PROCESSING_DONE";
const TOKEN_ID_FETCHED = 'TOKEN_ID_FETCHED';
const TX_SUCCESSFUL = 'TX_SUCCESSFUL';
const TX_BROADCASTED = 'TX_BROADCASTED'
const SET_DRIZZLE_STATE = "SET_DRIZZLE_STATE";  
const GOT_PROP_ADDRESS = "GOT_PROP_ADDRESS";
const TESTED_SAGA = 'TESTED_SAGA';


const initialState = {
  transactionProcessing:false,
  txSuccessful: false, 
  tokenId: null,
  drizzle: null,
  drizzleContracts:null,
  propAddress:1
};   
 
function appReducers(state = initialState, action) {
    switch (action.type) {
      case TESTED_SAGA:
        return { ...state, testedSaga: true };
      case TX_BROADCASTED:
        return { ...state, transactionProcessing: true };
      case TX_SUCCESSFUL:
        return { ...state,  txSuccessful: true, transactionProcessing: false };
      case TX_PROCESSING_DONE:
        return { ...state, checkMetaMask: false, checkingTx: false,transactionProcessing: false, txSuccessful: true };
      case TOKEN_ID_FETCHED:
          return { ...state, tokenId:action.tokenId};
      case SET_DRIZZLE_STATE:
          return { ...state, drizzle: action.drizzle };
      case GOT_PROP_ADDRESS:
          return { ...state, propAddress:action.propAddress};    
      default:
        return state;
    }
  }   



export default combineReducers({
  appReducers,
  ...drizzleReducers
});




