import { takeLatest } from 'redux-saga';
import { take,takem, call, put, fork, cancel } from 'redux-saga/effects';
import { getFlags } from '../services/flags';
import { message } from 'antd';

function* dataSearch(data) {
  try {
    var search = data.payload
    const { jsonResult } = yield call(getFlags,search);
    yield put({
        type: 'flags/search/success',
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

function* watchDataSearch() {

  yield takeLatest('flags/search', dataSearch)
}

export default function* () {
  yield fork(watchDataSearch);
}