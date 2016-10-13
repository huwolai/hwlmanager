import { takeLatest } from 'redux-saga';
import { take,takem, call, put, fork, cancel } from 'redux-saga/effects';
import { searchTasks } from '../services/task';
import { message } from 'antd';

function* taskListForExamineGet(data) {
  try {
    var params = data.payload
    const { jsonResult } = yield call(searchTasks,params.pageIndex,params.pageSize,params.keywords,params.field);
    yield put({
        type: 'task/examine/search/success',
        payload: jsonResult.data,
    });
  } catch (err) {

    message.error(err)
  }
}

function* watchTaskListForExamineGet(){

  yield takeLatest('task/examine/search', taskListForExamineGet)
}

export default function* () {
	  yield fork(watchTaskListForExamineGet);
}