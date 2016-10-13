import { takeLatest } from 'redux-saga';
import { take,takem, call, put, fork, cancel } from 'redux-saga/effects';
import { switchTask,queryTaskListForAud,queryTaskDetail,searchTasks,queryTaskTypes,queryTaskTpls,addTask } from '../services/task';
import { searchMerchants } from '../services/merchant';
import { message } from 'antd';

function* dataSearch(data) {
  try {
    var search = data.payload
    const { jsonResult } = yield call(searchTasks,search.pageIndex,search.pageSize,search.keywords,search.field);
    yield put({
        type: 'task/search/success',
        payload: jsonResult.data,
    });
  } catch (err) {

    message.error(err)
  }
}

/**
 * 获取待审核的任务
 * @param {[type]}
 * @yield {[type]} [description]
 */
function* switchTaskSagas(data) {
  try {
    var params = data.payload
    const { jsonResult } = yield call(switchTask,params);
    yield put({
        type: 'task/switch/success',
        payload: jsonResult.data,
    });
  } catch (err) {

    message.error(err)
  }
}

/**
 * 获取待审核的任务
 * @param {[type]}
 * @yield {[type]} [description]
 */
function* taskListForAudGet(data) {
  try {
    var search = data.payload
    const { jsonResult } = yield call(queryTaskListForAud,search.pageIndex,search.pageSize);
    yield put({
        type: 'task/search/success',
        payload: jsonResult.data,
    });
  } catch (err) {

    message.error(err)
  }
}

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
        type: 'task/merchant/search/success',
        payload: jsonResult.data,
    });
  } catch (err) {
    message.error(err)
  }
}

/**
 * 获取任务类型
 * @yield {[type]} [description]
 */
function* taskTypeGet() {
try {
    const { jsonResult } = yield call(queryTaskTypes);
    yield put({
        type: 'task/types/get/success',
        payload: jsonResult.data,
    });
  } catch (err) {
 
    message.error(err)
  }
}

function* taskTplsGet() {
try {
    const { jsonResult } = yield call(queryTaskTpls);
    yield put({
        type: 'task/tpls/get/success',
        payload: jsonResult.data.data,
    });
  } catch (err) {
 
    message.error(err)
  }
}


function* addTaskInfo(data){
  try {
    const { jsonResult } = yield call(addTask,data.payload);
    yield put({
        type: 'task/add/success',
        payload: jsonResult.data,
    });
  } catch (err) {
 
    message.error(err)
  }
}



function* watchTaskTplsGet() {

  yield takeLatest('task/tpls/get', taskTplsGet)
}

function* watchTaskTypeGet() {

  yield takeLatest('task/types/get', taskTypeGet)
}

function* watchAddTaskInfo() {

  yield takeLatest('task/add', addTaskInfo)
}

function* watchDataSearch() {

  yield takeLatest('task/search', dataSearch)
}

function* watchMerchantsSearch() {

  yield takeLatest('task/merchant/search', merchantsSearch)
}

function* watchTaskListForAudGet(){

  yield takeLatest('task/aud/search', taskListForAudGet)
}

function* watchSwitchTask(){

  yield takeLatest('task/switch', switchTaskSagas)
}

export default function* () {
  yield fork(watchDataSearch);
  yield fork(watchTaskTypeGet);
  yield fork(watchTaskTplsGet);
  yield fork(watchAddTaskInfo);
  yield fork(watchMerchantsSearch);
  yield fork(watchTaskListForAudGet);
  yield fork(watchSwitchTask);
}