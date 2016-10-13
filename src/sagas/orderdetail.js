import { takeLatest } from 'redux-saga';
import { take,takem, call, put, fork, cancel } from 'redux-saga/effects';
import { auditingTaskOrder,queryTaskDetail } from '../services/task';
import { message } from 'antd';

function* taskDetailGet(data) {
  try {
    var params = data.payload
    const { jsonResult } = yield call(queryTaskDetail,params.taskid,params.pageIndex,params.pageSize,params.keywords,params.field,params.auditingstatus);
    yield put({
        type: 'task/orderdetail/id/success',
        payload: jsonResult.data,
        pageIndex:params.pageIndex
    });
  } catch (err) {
 
    message.error(err)
  }
}



function* watchTaskDetailGet(){

  yield takeLatest('task/orderdetail/id', taskDetailGet)
}

export default function* () {

  yield fork(watchTaskDetailGet)
}