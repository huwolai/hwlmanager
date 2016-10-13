import { takeLatest } from 'redux-saga';
import { take,takem, call, put, fork, cancel } from 'redux-saga/effects';
import { login } from '../services/login';
import { message } from 'antd';
import { resultIsOk } from '../utils';
import {browserHistory} from 'react-router'

function* userLogin(data) {
  try {
    var user = data.payload
    const { jsonResult } = yield call(login,user);
    yield put({
        type: 'users/login/success',
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

function* watchuserLogin() {

  yield takeLatest('users/login', userLogin)
}

export default function* () {
  yield fork(watchuserLogin);
}