import {
  handleActions
} from 'redux-actions';
const distrib = handleActions({
  //分销查询成功
  ['distrib/search/success'](state, action) {

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
  //分销查询
  ['distrib/search'](state, action) {

    return {...state,
      loading: true
    };
  },
  ['distrib/model/change'](state, action) {

    return {...state,
      model: {...state.model,
        ...action.payload
      },
      loading: false
    };
  }, // 获取分销详情
  ['distrib/detail/get'](state, action) {

    return {...state,
      loading: false
    };
  }, //分销详情获取成功
  ['distrib/detail/get/success'](state, action) {

    return {...state,
      model: action.payload,
      loading: false
    };
  },
  //分销修改或添加
  ['distrib/addOrUpdate'](state, action) {

    return {...state,
      completion: false,
      loading: false
    };
  },
  //分销修改或添加成功
  ['distrib/addOrUpdate/success'](state, action) {

    return {...state,
      completion: true,
      loading: false
    };
  },
  //分销删除成功
  ['distrib/delete/success'](state, action) {

    return {...state,
      loading: false,
      refreshTable: true
    };
  },
  //分销删除
  ['distrib/delete'](state, action) {

    return {...state,
      loading: true,
      refreshTable: false
    };
  },
  //分销数据清空
  ['distrib/clear'](state, action) {

    return {...state,
      completion: false,
      model: {
        csn_rate: 0.1
      },
      prodDetail: {},
      loading: false
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