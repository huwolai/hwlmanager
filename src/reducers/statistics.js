import { handleActions } from 'redux-actions';

const statistics = handleActions({
  ['task/statistics/search/success'](state, action) {

    return { ...state, items: action.payload.data, pagination:{total:action.payload.total,pageSize:10},loading:false};
  },
  ['task/statistics/search'](state, action) {

    return { ...state, loading:true};
  },
},{
  items: [],
  pagination: {current:1,pageSize:10,total:0},
  columns: [],
  keywords: '',
  field: 'nickname',
})


export default statistics;