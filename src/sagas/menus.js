import { takeLatest } from 'redux-saga';
import { take,takem, call, put, fork, cancel } from 'redux-saga/effects';
import { getAllMenus } from '../services/menus';
import { message } from 'antd';

function* menusAll(data) {
  try {
    const { jsonResult } = yield call(getAllMenus,data.payload);
    yield put({
        type: 'menus/all/success',
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

function* watchMenusAll() {

  yield takeLatest('menus/all', menusAll)
}

export default function* () {
  yield fork(watchMenusAll);
}