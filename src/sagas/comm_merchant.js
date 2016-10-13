import { takeLatest } from 'redux-saga';
import { take,takem, call, put, fork, cancel } from 'redux-saga/effects';
import { searchMerchants } from '../services/merchant';
import { message } from 'antd';

/**
 * 搜索商户信息
 * @param {[type]}
 * @yield {[type]} [description]
 */
function* merchantsSearch(data) {
  try {
    var search = data.payload
    const { jsonResult } = yield call(searchMerchants,search.pageIndex,search.pageSize,search.keywords,search.field);
    yield put({
        type: 'comm_merchant/search/success',
        payload: jsonResult.data,
    });
  } catch (err) {
    message.error(err)
  }
}

function* watchMerchantsSearch() {

  yield takeLatest('comm_merchant/search', merchantsSearch)
}

export default function* () {
  yield fork(watchMerchantsSearch);
}