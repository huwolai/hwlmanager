import { handleActions } from 'redux-actions';

const users = handleActions({
  ['categories/search/success'](state, action) {

    return { ...state, items: action.payload};
  },
  ['categories/search'](state, action) {

    return { ...state};
  }
}, {
  items: []
})

export default users;