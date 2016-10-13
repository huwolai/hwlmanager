import { handleActions } from 'redux-actions';
import { merchantSearchColumns } from '../services/merchant';

const merchant = handleActions({
  ['merchant/search/success'](state, action) {

    return { ...state, items: action.payload.data, pagination:{total:action.payload.total,pageSize:10},loading:false,refreshTable:false};
  },
  ['merchant/search'](state, action) {

    return { ...state, loading:true};
  },
  ['merchant/search/columns'](state, action) {

    return { ...state, columns: merchantSearchColumns()};
  },
  ['merchant/search/condition/field'](state, action) {

    return { ...state, loading:false, field:action.payload.field};
  },
  ['merchant/search/condition/keywords'](state, action) {

    return { ...state, loading:false, keywords:action.payload.keywords};
  },
  ['merchantdetail/get'](state, action) {

    return { ...state, loading:true};
  },
  ['merchantdetail/get/success'](state, action) {

    return { ...state,detail: action.payload, loading:false};
  },
  ['merchantdetail/get/error'](state, action) {

    return { ...state, loading:false};
  },
  ['merchantimgs/get'](state, action) {

    return { ...state, loading:true};
  },
  ['merchantimgs/get/success'](state, action) {

    return { ...state,imgs: action.payload, loading:false};
  },
  ['merchantimgs/get/error'](state, action) {

    return { ...state, loading:false};
  },
  ['merchantaudit/post'](state, action) {

    return { ...state, loading:true,refreshTable:false};
  },
  ['merchantaudit/post/success'](state, action) {

    return { ...state,imgs: action.payload, loading:false, refreshTable:true};
  },
  ['merchantaudit/post/error'](state, action) {

    return { ...state, loading:false,refreshTable:false};
  }
}, {
  items: [],
  detail: {},
  refreshTable: false,
  imgs: [],
  pagination: {current:1,pageSize:10,total:0},
  keywords: '',
  field: 'nickname'
})

export default merchant;