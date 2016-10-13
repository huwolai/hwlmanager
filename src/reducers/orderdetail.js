import { handleActions } from 'redux-actions';
import { taskDetailColumns } from '../services/task';

const taskdetail1 = handleActions({
  ['task/orderdetail/columns'](state, action) {

    return { ...state, columns: taskDetailColumns()};
  },
  ['task/orderdetail/condition/field'](state, action) {

    return { ...state, loading:false, field:action.payload.field};
  },
  ['task/orderdetail/condition/keywords'](state, action) {

    return { ...state, loading:false, keywords:action.payload.keywords};
  },
  ['task/orderdetail/id'](state, action) {

    return { ...state,loading:true,auditingSuccess:false};
  },
  ['task/orderdetail/id/success'](state, action) {

    return { ...state, items:action.payload.data,pagination:{pageIndex:action.pageIndex,total:action.payload.total,pageSize:10},loading:false};
  }
},{
  items: [],
  pagination: {current:1,pageIndex:1,pageSize:10,total:0},
  columns: [],
  keywords: '',
  field: 'nickname'
})

export default taskdetail1;