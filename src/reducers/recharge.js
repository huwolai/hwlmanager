import { handleActions } from 'redux-actions';
const recharge = handleActions({
  ['recharge/merchant/success'](state, action) {

    return { ...state, success: true};
  },
  ['recharge/merchant/init'](state, action) {

    return { ...state, success: false};
  },
  ['recharge/merchant'](state, action) {

    return { ...state, success: false};
  }
},{
  success:false
})

export default recharge;