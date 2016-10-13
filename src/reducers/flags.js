import { handleActions } from 'redux-actions';

const flags = handleActions({
  ['flags/search/success'](state, action) {

    return { ...state, items: action.payload,loading:false};
  },
  ['flags/search'](state, action) {

    return { ...state, loading:true};
  },
  ['flags/search/error'](state, action) {

    return { ...state, loading:false};
  }
}, {
  items: [],
})

export default flags;