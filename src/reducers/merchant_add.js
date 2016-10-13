import { handleActions } from 'redux-actions';
import { merchantSearchColumns } from '../services/merchant';

const merchantadd = handleActions({
  ['merchant_add/add/success'](state, action) {

    return { ...state, saveSuccess:true};
  },
  ['merchant_add/add'](state, action) {

    return { ...state, saveSuccess:false};
  }
}, {
  saveSuccess:false
})

export default merchantadd;