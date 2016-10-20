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
  getProducts,
  getProductImgs,
  addProducts,
  getProductDetail,
  changeProductStatus,
  addProductSku,
  updateProductSku,
  updateProducts,
  changeProductRecom
} from '../services/prod';
import {
  message
} from 'antd';

function* productRecom(data) {
  try {
    var payload = data.payload
    const {
      jsonResult
    } = yield call(changeProductRecom, payload);
    yield put({
      type: 'prodrecom/put/success',
      payload: jsonResult
    });
  } catch (err) {
    yield put({
      type: 'prodrecom/put/error'
    });
    message.error(err)
  }
}



function* prodSkuAdd(data) {
  try {
    var payload = data.payload
    const {
      jsonResult
    } = yield call(addProductSku, payload);
    yield put({
      type: 'prodsku/add/success',
      payload: jsonResult
    });
  } catch (err) {
    yield put({
      type: 'prodsku/add/error'
    });
    message.error(err)
  }
}

function* prodSkuUpdate(data) {
  try {
    var payload = data.payload
    const {
      jsonResult
    } = yield call(updateProductSku, payload);
    yield put({
      type: 'prodsku/update/success',
      payload: jsonResult
    });
  } catch (err) {
    yield put({
      type: 'prodsku/update/error'
    });
    message.error(err)
  }
}

//商品图片
function* prodImgsGet(data) {
  try {
    var data = data.payload
    const {
      jsonResult
    } = yield call(getProductImgs, data);
    yield put({
      type: 'prod/images/get/success',
      payload: jsonResult
    });
  } catch (err) {
    yield put({
      type: 'prod/images/get/error'
    });
    message.error(err)
  }
}

function* prodSearch(data) {
  try {
    var search = data.payload
    const {
      jsonResult
    } = yield call(getProducts, search);
    yield put({
      type: 'prod/search/success',
      payload: jsonResult
    });
  } catch (err) {
    yield put({
      type: 'prod/search/error'
    });
    message.error(err)
  }
}

function* prodDetailGet(data) {
  try {
    var data = data.payload
    const {
      jsonResult
    } = yield call(getProductDetail, data.prodId);
    yield put({
      type: 'proddetail/get/success',
      payload: jsonResult
    });
  } catch (err) {
    yield put({
      type: 'proddetail/get/error'
    });
    message.error(err)
  }
}

function* prodStatusChange(data) {
  try {
    var data = data.payload
    const {
      jsonResult
    } = yield call(changeProductStatus, data.status, data.prodId);
    yield put({
      type: 'prodstatus/change/success',
      payload: jsonResult
    });
  } catch (err) {
    yield put({
      type: 'prodstatus/change/error'
    });
    message.error(err)
  }
}

function* prodAdd(data) {
  try {
    var payload = data.payload
    const {
      jsonResult
    } = yield call(addProducts, payload);
    yield put({
      type: 'prod/add/success',
      payload: jsonResult
    });
  } catch (err) {
    yield put({
      type: 'prod/add/error'
    });
    message.error(err)
  }
}

function* prodUpdate(data) {
  try {
    var payload = data.payload
    const {
      jsonResult
    } = yield call(updateProducts, payload);
    yield put({
      type: 'prod/update/success',
      payload: jsonResult
    });
  } catch (err) {
    yield put({
      type: 'prod/update/error'
    });
    message.error(err)
  }
}

function* watchProdImgsGet() {
  yield takeLatest('prod/images/get', prodImgsGet)
}

function* watchProductRecom() {
  yield takeLatest('prodrecom/put', productRecom)
}

function* watchProdStatusChange() {

  yield takeLatest('prodstatus/change', prodStatusChange)
}

function* watchProdDetailGet() {

  yield takeLatest('proddetail/get', prodDetailGet)
}

function* watchProdSearch() {

  yield takeLatest('prod/search', prodSearch)
}

function* watchProdAdd() {

  yield takeLatest('prod/add', prodAdd)
}

function* watchProdUpdate() {

  yield takeLatest('prod/update', prodUpdate)
}

function* watchProdSkuAdd() {
  yield takeLatest('prodsku/add', prodSkuAdd)
}

function* watchProdSkuUpdate() {
  yield takeLatest('prodsku/update', prodSkuUpdate)
}

export default function*() {
  yield fork(watchProdImgsGet);
  yield fork(watchProductRecom);
  yield fork(watchProdStatusChange);
  yield fork(watchProdDetailGet);
  yield fork(watchProdSearch);
  yield fork(watchProdAdd);
  yield fork(watchProdSkuAdd);
  yield fork(watchProdUpdate);
  yield fork(watchProdSkuUpdate)
}