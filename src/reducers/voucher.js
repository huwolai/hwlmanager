import { handleActions } from 'redux-actions';
const voucher = handleActions({
  ['task/voucher/get/success'](state, action) {

    return { ...state, items:action.payload};
  }
}, {
  items: []
});

export default voucher;