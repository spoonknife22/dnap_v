import { put, takeEvery, takeLatest } from 'redux-saga/effects';

const GET_PROP_ADDRESS ='GET_PROP_ADDRESS';
const TX_BROADCASTED = 'TX_BROADCASTED'
const TX_PROCESSING_DONE = "TX_PROCESSING_DONE";
const TX_SUCCESSFUL = 'TX_SUCCESSFUL';
const GOT_STACK_ID ="GOT_STACK_ID"

function* transactionProcessing() {
  yield put({ type: 'TX_PROCESSING'});
}

function* txSuccessful() {
  yield put({ type: 'TX_PROCESSING_DONE'});
}

function* fetchPropAddr () {
  yield put({ type:'GOT_PROP_ADDRESS', propAddress:33});
}

function* fetchStackId () {
  yield put({ type:GOT_STACK_ID, stackId:stackId});
}


function* appRootSaga () {
  yield takeEvery(TX_BROADCASTED, transactionProcessing);
  yield takeLatest(TX_SUCCESSFUL, txSuccessful);
  yield takeEvery(GET_PROP_ADDRESS, fetchPropAddr);
  yield takeEvery(GOT_STACK_ID, fetchStackId);
}

export default appRootSaga;
