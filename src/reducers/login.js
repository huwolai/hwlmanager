import { handleActions } from 'redux-actions';
import { combineReducer } from 'redux';

const logins = handleActions({
  ['users/login/success'](state, action) {
    return { ...state, user: action.payload, loggedIn:true };
  },
  ['users/login/failed'](state, action) {
    return { ...state, user: null,loginErrors:action.payload, loggedIn:false };
  },
  ['users/login/forward'](state, action) {
    return { ...state, user: {}, loggedIn:false };
  }
}, {
  user: {},
  loading: false,
})

export default logins;