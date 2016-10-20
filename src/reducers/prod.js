import {
  handleActions
} from 'redux-actions';
import {
  imageWithMSmall
} from '../services/imageutils';
const initSate = {
  items: [],
  flags: [],
  flag: "",
  prodImgs: [],
  merchantId: "",
  keyword: "",
  prodAdded: false,
  prodUpdated: false,
  prodDetail: {},
  refreshTable: false,
  pagination: {
    current: 1,
    page_index: 1,
    page_size: 10,
    total: 0
  }
}
const prod = handleActions({
  ['prod/search/success'](state, action) {

    return {...state,
      items: action.payload.data,
      refreshTable: false,
      pagination: {
        total: action.payload.total,
        page_size: action.payload.page_size,
        page_index: action.payload.page_index,
        current: action.payload.page_index
      },
      loading: false
    };
  },
  ['prod/search'](state, action) {

    return {...state,
      loading: true,
      merchantId: action.payload.merchant_id,
      flag: action.payload.flags,
      refreshTable: false
    };
  },
  ['prod/search/error'](state, action) {

    return {...state,
      loading: true,
      refreshTable: false
    };
  },
  ['proddetail/get'](state, action) {

    return {...state,
      loading: true
    };
  },
  ['proddetail/get/clear'](state, action) {

    return {...initSate
    }
  },
  ['proddetail/get/success'](state, action) {

    return {...state,
      prodDetail: action.payload,
      loading: false
    };
  },
  ['prod/update'](state, action) {

    return {...state,
      loading: true,
      prodUpdated: false
    };
  },
  ['prod/update/success'](state, action) {

    return {...state,
      prodDetail: action.payload,
      loading: false,
      prodUpdated: true
    };
  },
  ['prod/update/error'](state, action) {

    return {...state,
      loading: false,
      prodUpdated: false
    };
  },
  ['prod/add'](state, action) {

    return {...state,
      loading: true,
      prodAdded: false
    };
  },
  ['prod/add/success'](state, action) {

    return {...state,
      prodDetail: action.payload,
      loading: false,
      prodAdded: true
    };
  },
  ['prod/add/error'](state, action) {

    return {...state,
      loading: false,
      prodAdded: false
    };
  },
  ['prodstatus/change'](state, action) {

    return {...state,
      loading: true
    };
  },
  ['prodstatus/change/success'](state, action) {

    return {...state,
      refreshTable: true,
      loading: false
    };
  },
  ['prodstatus/change/error'](state, action) {

    return {...state,
      refreshTable: false,
      loading: false
    };
  },
  ['prodrecom/put'](state, action) {

    return {...state,
      loading: true
    };
  },
  ['prodrecom/put/success'](state, action) {

    return {...state,
      refreshTable: true,
      loading: false
    };
  },
  ['prodrecom/put/error'](state, action) {

    return {...state,
      refreshTable: false,
      loading: false
    };
  },
  ['prod/images/get'](state, action) {

    return {...state,
      loading: true
    };
  },
  ['prod/images/get/success'](state, action) {
    let defaultFileList = [];
    if (action.payload) {
      for (var index in action.payload) {
        let pImg = action.payload[index]
        defaultFileList.push({
          uid: -index,
          status: 'done',
          url: imageWithMSmall(pImg.url)
        });
      }
    }
    return {...state,
      prodImgs: defaultFileList,
      loading: false
    };
  },
  ['prod/images/get/error'](state, action) {

    return {...state,
      loading: false
    };
  }
}, initSate)

export default prod;