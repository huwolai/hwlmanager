import { handleActions } from 'redux-actions';
import { taskDetailColumns } from '../services/task';

const taskdetail1 = handleActions({
  ['task/detail/columns'](state, action) {

    return { ...state, columns: taskDetailColumns()};
  },
  ['task/detail/condition/field'](state, action) {

    return { ...state, loading:false, field:action.payload.field};
  },
  ['task/detail/condition/keywords'](state, action) {

    return { ...state, loading:false, keywords:action.payload.keywords};
  },
  ['task/detail/id'](state, action) {

    return { ...state,loading:true,pagination:{pageIndex:action.payload.pageIndex,total:action.payload.total,pageSize:10},auditingSuccess:false};
  },
  ['task/detail/id/success'](state, action) {

    return { ...state, items:action.payload.data,pagination:{pageIndex:state.pagination.pageIndex,total:action.payload.total,pageSize:10},loading:false};
  },
  ['task/aud/status/success'](state, action) {

    return { ...state, auditingSuccess:true};
  },
  ['task/aud/refuse/show'](state, action) { //显示拒绝原因输入框

    return { ...state, showRefuseResonModal:true,audParamObj:action.payload};
  },
  ['task/aud/refuse/hidden'](state, action) { //隐藏拒绝原因输入框

    return { ...state, showRefuseResonModal:false,audParamObj:action.payload};
  }
},{
  items: [],
  pagination: {current:1,pageIndex:1,pageSize:10,total:0},
  columns: [],
  keywords: '',
  field: 'nickname',
  taskTypes: [],
  tpls: [],
  saving: false,
  merchants: [],
  merchantFocus: false,
  tplsDescObj: {},
  saveSuccess:false,
  auditingSuccess: false,
  showRefuseResonModal:false,
  audParamObj: {}
})

export default taskdetail1;