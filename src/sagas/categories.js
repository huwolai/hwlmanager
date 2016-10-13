import { takeLatest } from 'redux-saga';
import { take,takem, call, put, fork, cancel } from 'redux-saga/effects';
import { getCategories } from '../services/categories.js';
import { message } from 'antd';

function* categoriesSearch(data) {
  try {
    var search = data.payload
    const { jsonResult } = yield call(getCategories);
    yield put({
        type: 'categories/search/success',
        payload: jsonResult
    });
  } catch (err) {
    // yield put({
    //  type: 'users/login/failed',
    //  payload: [user.username] + err ,
    // });
    message.error(err)
  }
}



function* watchCategoriesSearch() {

  yield takeLatest('categories/search', categoriesSearch)
}

export default function* () {
  yield fork(watchCategoriesSearch);
}