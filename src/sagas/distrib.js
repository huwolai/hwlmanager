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
  addOrUpdateDistribution,
  getDistribution,
  getDistributionDetail,
  deleteDistribution
} from '../services/distribution';
import {
  message
} from 'antd';

function* DistributionAddOrUpdate(data) {
  try {
    var param = data.payload
    const {
      jsonResult
    } = yield call(addOrUpdateDistribution, param);
    yield put({
      type: 'distrib/addOrUpdate/success',
      payload: jsonResult,
    });
  } catch (err) {
    // yield put({
    //  type: 'users/login/failed',
    //  payload: [user.username] + err ,
    // });
    message.error(err)
  }
}

function* DistributionDelete(data) {
  try {
    var param = data.payload
    const {
      jsonResult
    } = yield call(deleteDistribution, param);
    yield put({
      type: 'distrib/delete/success',
      payload: jsonResult,
    });
  } catch (err) {
    // yield put({
    //  type: 'users/login/failed',
    //  payload: [user.username] + err ,
    // });
    message.error(err)
  }
}

function* DistributionDetailGet(data) {
  try {
    var param = data.payload
    const {
      jsonResult
    } = yield call(getDistributionDetail, param);
    yield put({
      type: 'distrib/detail/get/success',
      payload: jsonResult,
    });
  } catch (err) {
    // yield put({
    //  type: 'users/login/failed',
    //  payload: [user.username] + err ,
    // });
    message.error(err)
  }
}

function* DistributionGet(data) {
  try {
    var param = data.payload
    const {
      jsonResult
    } = yield call(getDistribution, param);
    yield put({
      type: 'distrib/search/success',
      payload: jsonResult,
    });
  } catch (err) {
    // yield put({
    //  type: 'users/login/failed',
    //  payload: [user.username] + err ,
    // });
    message.error(err)
  }
}

function* watchDistributionDelete() {
  yield takeLatest('distrib/delete', DistributionDelete)
}

function* watchDistributionDetailGet() {

  yield takeLatest('distrib/detail/get', DistributionDetailGet)
}

function* watchDistributionAddOrUpdate() {

  yield takeLatest('distrib/addOrUpdate', DistributionAddOrUpdate)
}

function* watchDistributionGet() {

  yield takeLatest('distrib/search', DistributionGet)
}

export default function*() {
  yield fork(watchDistributionDelete);
  yield fork(watchDistributionDetailGet);
  yield fork(watchDistributionAddOrUpdate);
  yield fork(watchDistributionGet);
}