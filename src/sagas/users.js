import {
  takeLatest
} from 'redux-saga';
import {
  take,
  takem,
  call,
  put,
  fork,
  cancel
} from 'redux-saga/effects';
import {
  searchUsers
} from '../services/users';
import {
  message
} from 'antd';

function* usersSearch(data) {
  try {
    var search = data.payload
    const {
      jsonResult
    } = yield call(searchUsers, search);
    yield put({
      type: 'users/search/success',
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



function* watchUsersSearch() {

  yield takeLatest('users/search', usersSearch)
}

export default function*() {
  yield fork(watchUsersSearch);
}