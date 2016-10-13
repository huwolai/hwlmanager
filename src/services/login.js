import xFetch from './xFetch';

import config from './config';

export async function login(data) {

	return xFetch(`${config.commuser.url}/login`,{method:'POST',headers:{
		'Content-Type': 'application/json',
		"app_id":`${config.commuser.appid}`
	},body: JSON.stringify({username:data.username,password:data.password})})

  
  // return xFetch(`http://pay.qiyunxin.com/accountsrecord/user`,{method:"POST",mode:"no-cors",headers:{
  // 	'Content-Type': 'application/json; charset=utf-8',
  // 	'app_id':'kuailiao'
  // },body:JSON.stringify({app_id:'kuailiao'})});

 // return xFetch("http://shopapi.qiyunxin.com"+'/v1/order/?app_id='+config.commuser.appid,{mode: 'cors',method: "POST",headers: {'Content-Type': 'application/json',"app_id":"2323"}, body: JSON.stringify(data)});
}