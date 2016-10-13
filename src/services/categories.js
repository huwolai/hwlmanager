import xFetch from './xFetch';
import config from './config';

//获取分类
export async function getCategories() {

	return xFetch(`${config.shopapi.url}/categories/`,{method:'GET',headers:{
		'Content-Type': 'application/json',
		"app_id":`${config.shopapi.appid}`
	}})
}