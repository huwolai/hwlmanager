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
  getOrders
} from '../services/order';
import {
  message
} from 'antd';

function* ordersGet(data) {
  try {
    var params = data.payload
    const {
      jsonResult
    } = yield call(getOrders, params);
    yield put({
      type: 'order/list/success',
      payload: jsonResult,
    });
  } catch (err) {

    message.error(err)
    yield put({
      type: 'order/list/error',
      payload: err
    });
  }
}



function* watchOrdersGet() {

  yield takeLatest('order/list', ordersGet)
}

export default function*() {

  yield fork(watchOrdersGet)
}