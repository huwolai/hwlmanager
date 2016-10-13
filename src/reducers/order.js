import {
  handleActions
} from 'redux-actions';
const distrib = handleActions({
  //订单列表查询成功
  ['order/list/success'](state, action) {

    return {...state,
      items: action.payload.data,
      pagination: {
        total: action.payload.total,
        pageIndex: action.payload.page_index,
        pageSize: action.payload.page_size
      },
      refreshTable: false,
      loading: false
    };
  },
  //订单列表
  ['order/list'](state, action) {

    return {...state,
      loading: true
    };
  }
}, {
  items: [],
  //是否操作完成
  completion: false,
  refreshTable: false,
  pagination: {
    current: 1,
    pageSize: 10,
    total: 0
  },
  //分销model
  model: {
    csn_rate: 0.1
  },
  // 商品详情
  prodDetail: {}
})


export default distrib;