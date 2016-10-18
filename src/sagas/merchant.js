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
  searchMerchants,
  getMerchantDetail,
  getMerchantImgs,
  auditMerchant
} from '../services/merchant';
import {
  message
} from 'antd';

function* dataSearch(data) {
  try {
    var search = data.payload
    const {
      jsonResult
    } = yield call(searchMerchants, search);
    yield put({
      type: 'merchant/search/success',
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

//商户审核
function* merchantAudit(data) {
  try {
    var query = data.payload
    const {
      jsonResult
    } = yield call(auditMerchant, query);
    yield put({
      type: 'merchantaudit/post/success',
      payload: jsonResult
    });
  } catch (err) {
    yield put({
      type: 'merchantaudit/post/error'
    });
    message.error(err)
  }
}

//商户详情
function* merchantDetail(data) {
  try {
    var query = data.payload
    const {
      jsonResult
    } = yield call(getMerchantDetail, query);
    yield put({
      type: 'merchantdetail/get/success',
      payload: jsonResult
    });
  } catch (err) {
    yield put({
      type: 'merchantdetail/get/error'
    });
    message.error(err)
  }
}

//获取商户图片
function* merchantImgs(data) {
  try {
    var query = data.payload
    const {
      jsonResult
    } = yield call(getMerchantImgs, query);
    yield put({
      type: 'merchantimgs/get/success',
      payload: jsonResult
    });
  } catch (err) {
    yield put({
      type: 'merchantimgs/get/error'
    });
    message.error(err)
  }
}

function* watchMerchantAudit() {
  yield takeLatest('merchantaudit/post', merchantAudit)
}

function* watchMerchantDetail() {
  yield takeLatest('merchantdetail/get', merchantDetail)
}

function* watchMerchantImgs() {
  yield takeLatest('merchantimgs/get', merchantImgs)
}

function* watchDataSearch() {

  yield takeLatest('merchant/search', dataSearch)
}

export default function*() {
  yield fork(watchMerchantAudit);
  yield fork(watchMerchantImgs);
  yield fork(watchDataSearch);
  yield fork(watchMerchantDetail);
}