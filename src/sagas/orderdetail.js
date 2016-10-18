import {
  takeLatest
} from 'redux-saga';
import {
  take,
  takem,
  call,
  put,
  fork,
  cancel
} from 'redux-saga/effects';
import {
  getOrderDetail
} from '../services/order';
import {
  message
} from 'antd';

function* OrderDetailGet(data) {
  try {
    var params = data.payload
    const {
      jsonResult
    } = yield call(getOrderDetail, params);
    yield put({
      type: 'orderdetail/get/success',
      payload: jsonResult
    });
  } catch (err) {

    message.error(err)
    yield put({
      type: 'orderdetail/get/error'
    });
  }
}



function* watchOrderDetailGet() {

  yield takeLatest('orderdetail/get', OrderDetailGet)
}

export default function*() {

  yield fork(watchOrderDetailGet)
}