import { handleActions } from 'redux-actions';
import { taskExamineColumns,taskDetailColumns } from '../services/task';
const task = handleActions({

  ['task/search/success'](state, action) {

    return { ...state, items: action.payload.data, pagination:{total:action.payload.total,pageIndex:state.pagination.pageIndex,pageSize:10},loading:false,switchSuccess:false};
  },
  ['task/search'](state, action) {

    return { ...state,pagination:{total:action.payload.total,pageIndex:action.payload.pageIndex,pageSize:10}, loading:true};
  },
  ['task/search/columns'](state, action) {

    return { ...state};
  },
  ['task/search/condition/field'](state, action) {

    return { ...state, loading:false, field:action.payload.field};
  },
  ['task/search/condition/keywords'](state, action) {

    return { ...state, loading:false, keywords:action.payload.keywords};
  },
  ['task/types/get/success'](state, action) {

    return { ...state, taskTypes:action.payload};
  },
  ['task/tpls/get/success'](state, action) {

    return { ...state, tpls:action.payload};
  },
  ['task/tpls/select'](state, action) {
    state.tplsDescObj[action.payload.key] = {id:action.payload.key,name:action.payload.value,price:action.payload.price}
    return { ...state, tplsDescObj:{...state.tplsDescObj}};
  },
  ['task/tpls/deselect'](state, action) {
    delete state.tplsDescObj[action.payload.key]
    return { ...state, tplsDescObj:{...state.tplsDescObj}};
  },
  ['task/add/init'](state, action) {
     return { ...state, saveSuccess:false,tplsDescObj:{}};
  },
  ['task/add/showModal'](state, action) {
     return { ...state, showModal:true};
  },
  ['task/add/hiddenModal'](state, action) {
     return { ...state, showModal:false};
  },
  ['task/add'](state, action) {

    return { ...state, saving:true};
  },
  ['task/add/success'](state, action) {

    return { ...state, saving:false,saveSuccess:true};
  },
  ['task/merchant/search/success'](state, action) {

 
    return { ...state, merchants:action.payload.data};
  },
  ['task/merchant/focus'](state, action) {

    return { ...state, merchantFocus:action.payload.merchantFocus};
  },
  ['task/merchant/mvalue'](state, action) {

    return { ...state, mvalue:action.payload};
  },
  ['task/switch/success'](state, action) {

    return { ...state, switchSuccess:true};
  },
  ['task/switch'](state, action) {

    return { ...state, switchSuccess:false};
  }

}, {
  details: [],
  items: [],
  pagination: {current:1,pageIndex:1,pageSize:10,total:0},
  columns: [],
  keywords: '',
  field: 'taskname',
  taskTypes: [],
  tpls: [],
  saving: false,
  merchants: [],
  merchantFocus: false,
  tplsDescObj: {},
  saveSuccess:false,
  switchSuccess:false
})

export default task;