import { takeLatest } from 'redux-saga';
import { take, takem, call, put, fork, cancel } from 'redux-saga/effects';
import { auditingTaskOrder, queryTaskDetail } from '../services/task';
import { message } from 'antd';

function* taskDetailGet(data) {
    try {
        var params = data.payload
        const { jsonResult } = yield call(queryTaskDetail, params.taskid, params.pageIndex, params.pageSize, params.keywords, params.field, params.auditingstatus);
        yield put({
            type: 'task/detail/id/success',
            payload: jsonResult.data
        });
    } catch (err) {

        message.error(err)
    }
}

function* auditingTaskOrderGet(data) {
    try {


        var params = data.payload
        const { jsonResult } = yield call(auditingTaskOrder, params);
        yield put({
            type: 'task/aud/status/success'
        });
    } catch (err) {

        message.error(err)
    }
}

function* watchTaskDetailGet() {

    yield takeLatest('task/detail/id', taskDetailGet)
}

function* watchAuditingTaskOrderGet() {

    yield takeLatest('task/aud/status', auditingTaskOrderGet)
}


export default function*() {

    yield fork(watchTaskDetailGet)
    yield fork(watchAuditingTaskOrderGet)
}
