import { all, fork, takeLatest, put, call, take, race, select, takeEvery } from 'redux-saga/effects';
import { drizzleSagas }  from '@drizzle/store';

const GET_PROP_ADDRESS ='GET_PROP_ADDRESS';
const TX_BROADCASTED = 'TX_BROADCASTED'
const TX_PROCESSING_DONE = "TX_PROCESSING_DONE";
const TX_SUCCESSFUL = 'TX_SUCCESSFUL';

function* transactionProcessing() {
  yield put({ type: 'TX_PROCESSING'});
}

function* txSuccessful() {
  yield put({ type: 'TX_PROCESSING_DONE'});
}

function* fetchPropAddr () {
  yield put({ type:'GOT_PROP_ADDRESS', propAddress:33});
}


export default function* appRootSaga() {
  yield takeEvery(TX_BROADCASTED, transactionProcessing);
  yield takeLatest(TX_SUCCESSFUL, txSuccessful);
  yield takeEvery(GET_PROP_ADDRESS, fetchPropAddr);
  yield all(
    ...drizzleSagas.map(saga => fork(saga))
  );
  }


