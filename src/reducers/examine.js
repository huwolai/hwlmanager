import { handleActions } from 'redux-actions';
const examine = handleActions({
  ['task/examine/search/success'](state, action) {

    return { ...state, items: action.payload.data, pagination:{total:action.payload.total,pageSize:10},loading:false};
  },
  ['task/examine/search'](state, action) {

    return { ...state, loading:true};
  },
  ['task/examine/condition/field'](state, action) {

    return { ...state, loading:false, field:action.payload.field};
  },
  ['task/examine/condition/keywords'](state, action) {

    return { ...state, loading:false, keywords:action.payload.keywords};
  }
},{
  items: [],
  pagination: {current:1,pageSize:10,total:0},
  columns: [],
  keywords: '',
  field: 'nickname',
})


export default examine;