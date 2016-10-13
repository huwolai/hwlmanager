import { takeLatest } from 'redux-saga';
import { take,takem, call, put, fork, cancel } from 'redux-saga/effects';
import { queryTaskListForCount } from '../services/task';
import { message } from 'antd';

function* taskListForCountGet(data) {
  try {
    var params = data.payload
    const { jsonResult } = yield call(queryTaskListForCount,params);
    yield put({
        type: 'task/statistics/search/success',
        payload: jsonResult.data,
    });
  } catch (err) {

    message.error(err)
  }
}

function* watchTaskListForCountGet(){

  yield takeLatest('task/statistics/search', taskListForCountGet)
}

export default function* () {
	  yield fork(watchTaskListForCountGet);
}