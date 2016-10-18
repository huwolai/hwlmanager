import {
  handleActions
} from 'redux-actions';

const orderdetail = handleActions({
  ['orderdetail/get/success'](state, action) {

    return {...state,
      loading: false,
      model: action.payload
    };
  },
  ['orderdetail/get/error'](state, action) {

    return {...state,
      loading: false,
    };
  },
  ['orderdetail/get'](state, action) {

    return {...state,
      loading: true,
      model: {}
    };
  }
}, {
  model: {},
  loading: false
})

export default orderdetail;