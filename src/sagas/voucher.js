import { takeLatest } from 'redux-saga';
import { take,takem, call, put, fork, cancel } from 'redux-saga/effects';
import { queryViewVoucher } from '../services/task';
import { message } from 'antd';

function* viewVoucherGet(data) {
  try {
    var params = data.payload
    const { jsonResult } = yield call(queryViewVoucher,params);
    yield put({
        type: 'task/voucher/get/success',
        payload: jsonResult.data,
    });
  } catch (err) {
 
    message.error(err)
  }
}

function* watchViewVoucherGet(){

  yield takeLatest('task/voucher/get', viewVoucherGet)
}


export default function* () {

  yield fork(watchViewVoucherGet)
}