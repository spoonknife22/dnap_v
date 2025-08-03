const NOM_TX_PROCESSING = 'NOM_TX_PROCESSING'
const TX_PROCESSING_DONE = "TX_PROCESSING_DONE";
const TX_PROCESSING = "TX_PROCESSING";
const TOKEN_ID_FETCHED = 'TOKEN_ID_FETCHED';
const TX_SUCCESSFUL = 'TX_SUCCESSFUL';
const TX_BROADCASTED = 'TX_BROADCASTED'
const SET_DRIZZLE_STATE = "SET_DRIZZLE_STATE";  
const GOT_PROP_ADDRESS = "GOT_PROP_ADDRESS";
const SET_TOKEN_ID = "SET_TOKEN_ID";
const TESTED_SAGA = 'TESTED_SAGA';
const PROPOSAL_BALANCE = 'PROPOSAL_BALANCE';
const GOT_PROP_ABI = "GOT_PROP_ABI";
const PROPOSAL_STORAGE_CONTRACT = 'PROPOSAL_STORAGE_CONTRACT';
const GOT_CURRENT_CONTRIB = "GOT_CURRENT_CONTRIB";
const CONTRIB_COMPLETE = "CONTRIB_COMPLETE";
const SET_NftAddress = "SET_NftAddress";
const GOT_STACK_ID ="GOT_STACK_ID";
const GOT_DEP_STACK_ID = "GOT_DEP_STACK_ID";
const APROVED_AMOUNT = "APROVED_AMOUNT";
const GOT_ASSET_DATA = "GOT_ASSET_DATA";
const GOT_SOLD_STATUS = "GOT_SOLD_STATUS";
const GOT_STORED_ORDER_ID = "GOT_STORED_ORDER_ID"; 


const initialState = {
  transactionProcessing:false,
  processingDone: null,
  txSuccessful: false, 
  tokenId: null,
  drizzle: null,
  drizzleContracts:null,
  propAddress:null, 
  testedSega:false,
  contractBalance:null,
  proposalStorageAbi:null,
  proposalStorage:null,
  userContribBalance:null,
  contribComplete:null,
  NftAddress: null, 
  stackId:null,
  depStackId:null,
  convertedContribution:null,
  approvedAmount:0,
  manaApproved:0,
  depositAmount:0,
  listPrice:0,
  assetPrice:null,
  expiresAt:0,
  currentExpiresAt:null,
  status:null,
  storedOrderId:null,
  proposalBalance:null
};   

GOT_SOLD_STATUS
function appReducer(state = initialState, action) {
  switch (action.type) {
    case PROPOSAL_BALANCE:
      return { ...state, contractBalance: action.balance, depositAmount:action.depositAmount, listPrice: action.listPrice, expiresAt: action.expiresAt}; 
    case GOT_ASSET_DATA:
      return { ...state, assetPrice: action.assetPrice, currentExpiresAt:action.currentExpiresAt}; 
    case GOT_PROP_ABI:
        return { ...state, proposalStorageAbi: action.proposalStorageAbi }; 
    case PROPOSAL_STORAGE_CONTRACT:
      return { ...state, proposalStorage: action.proposalStorage }; 
    case SET_NftAddress:
      return { ...state, nftAddress:`0x804516C4c64E3D2a78ef5eAc0E6a57A0b6bB96B3`}; 
    case GOT_CURRENT_CONTRIB:
      return { ...state, userContribBalance: action.userContribBalance }; 
    case CONTRIB_COMPLETE:
      return { ...state, contribComplete: false }; 
    case TX_BROADCASTED:
      return { ...state, transactionProcessing: true, processingDone:false };
    case APROVED_AMOUNT:
      return { ...state, approvedAmount: action.approvedAmount };
    case TX_SUCCESSFUL:
      return { ...state,  txSuccessful: true, transactionProcessing: false, processingDone:true };
    case GOT_SOLD_STATUS:
      return { ...state,  status: action.status, proposalBalance: action.proposalBalance };  
    case GOT_STORED_ORDER_ID:
    return { ...state,  storedOrderId: action.storedOrderId}; 
    case GOT_STACK_ID:
      return { ...state,stackId: action.stackId, approvedAmount:action.convertedContribution};
    case GOT_DEP_STACK_ID:
      return { ...state,depStackId: action.depStackId, manaApproved:action.manaApproved};
    case SET_TOKEN_ID:
        return { ...state, tokenId:action.tokenId};
    case SET_DRIZZLE_STATE:
        return { ...state, drizzle: action.drizzle };
    case GOT_PROP_ADDRESS:
        return { ...state, propAddress:action.proposalAddress};    
    default:
      return state;
  }
}   
export default appReducer;

