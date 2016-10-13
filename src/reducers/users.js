import {
  handleActions
} from 'redux-actions';
const users = handleActions({
  ['users/search/success'](state, action) {

    return {...state,
      items: action.payload.data,
      pagination: {
        total: action.payload.total,
        pageSize: 10
      },
      loading: false
    };
  },
  ['users/search'](state, action) {

    return {...state,
      loading: true
    };
  }
}, {
  items: [],
  pagination: {
    current: 1,
    pageSize: 10,
    total: 0
  }
})

export default users;