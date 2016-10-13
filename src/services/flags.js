import xFetch from './xFetch';
import config from './config';


//获取标记
export async function getFlags({status,types}) {
	return xFetch(`${config.shopapi.url}/flags/?types=${types}&status=${status}`,{method:'GET',headers:{
        'Content-Type': 'application/json',
        "app_id":`${config.shopapi.appid}`
    }})
}