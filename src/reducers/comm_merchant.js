import { handleActions } from 'redux-actions';

const comm_merchant = handleActions({
  ['comm_merchant/search/success'](state, action) {
 
    return { ...state, merchants:action.payload.data};
  },
  ['comm_merchant/focus'](state, action) {

    return { ...state, merchantFocus:action.payload.merchantFocus};
  },
  ['comm_merchant/mvalue'](state, action) {

    return { ...state, mvalue:action.payload};
  }
},{
  mvalue: '',
  merchants: [],
  merchantFocus: false
})

export default comm_merchant;