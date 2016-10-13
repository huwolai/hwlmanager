import { handleActions } from 'redux-actions';
import { combineReducer } from 'redux';
import _ from 'lodash';

const menus = handleActions({
  ['menus/all/success'](state, action) {
    return { ...state, items: action.payload, loading:false };
  },
  ['menus/all'](state, action) {
    return { ...state,loading:true };
  },
  ['menus/update'](state, action) {

    function getTmpObj(tmpKey,items){
      
      for (var i = 0; i < items.length; i++) {
        let obj =  items[i]
        if (tmpKey==obj.id){
          return obj;
        }else{
          if (obj.child&&obj.child.length>0) {
            let tpObj = getTmpObj(tmpKey,obj.child)
            if (tpObj) {
              return tpObj
            }
          }
        }
      }
    }

    let navpath = [], tmpOb, tmpKey, child;
    console.log(action.payload)
      if(action.payload.data){
        action.payload.data.reverse().map((item)=>{
          if(item.indexOf('sub') != -1){
            tmpKey = item.replace('sub', '');
            tmpOb = getTmpObj(tmpKey,state.items);
            child = tmpOb.child;
            navpath.push({
              key: tmpOb.id,
              name: tmpOb.name
            })
          }
          if(item.indexOf('menu') != -1){
            tmpKey = item.replace('menu', '');
            if(child){
              tmpOb = _.find(child, function(o) {
                return o.id == tmpKey;
              });
            }
            navpath.push({
              key: tmpOb.id,
              name: tmpOb.name
            })
          }
        })
      }
      return Object.assign({}, state, {
        currentKey: action.payload.key,
        navpath: navpath
      });
  }
}, {
  items: [],
  currentKey: '',
  navpath: [],
  loading: false,
})

export default menus;