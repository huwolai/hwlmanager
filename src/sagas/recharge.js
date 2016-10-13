import { takeLatest } from 'redux-saga';
import { take,takem, call, put, fork, cancel } from 'redux-saga/effects';
import { recharge } from '../services/merchant';
import { message } from 'antd';

function* rechargeSagas(data) {
  try {
    var params = data.payload
    const { jsonResult } = yield call(recharge,params);
    yield put({
        type: 'recharge/merchant/success'
    });
  } catch (err) {
    message.error(err)
  }
}



function* watchRechargeSagas() {

  yield takeLatest('recharge/merchant', rechargeSagas)
}

export default function* () {
  yield fork(watchRechargeSagas);
}