import { takeLatest } from 'redux-saga';
import { take,takem, call, put, fork, cancel } from 'redux-saga/effects';
import { merchantAdd } from '../services/merchant';
import { message } from 'antd';

function* merchantAddSagas(data) {
  try {
    var params = data.payload
    const { jsonResult } = yield call(merchantAdd,params);
    yield put({
        type: 'merchant_add/add/success',
        payload: jsonResult.data,
    });
  } catch (err) {

    message.error(err)
  }
}

function* watchMerchantAdd() {

  yield takeLatest('merchant_add/add', merchantAddSagas)
}

export default function* () {
  yield fork(watchMerchantAdd);
}