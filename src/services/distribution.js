import xFetch from './xFetch';
import config from './config';


//添加或修改分销
export async function addOrUpdateDistribution(model) {
	return xFetch(`${config.shopapi.url}/distributions/`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			"app_id": `${config.shopapi.appid}`
		},
		body: JSON.stringify(model)
	})
}

//获取分销列表
export async function getDistribution({
	page_index,
	page_size
}) {
	return xFetch(`${config.shopapi.url}/distributions/?page_index=${page_index}&page_size=${page_size}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			"app_id": `${config.shopapi.appid}`
		}
	})
}

//获取分销详情
export async function getDistributionDetail({
	distribution_id
}) {
	return xFetch(`${config.shopapi.url}/distribution/${distribution_id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			"app_id": `${config.shopapi.appid}`
		}
	})
}

// 删除分销商品
export async function deleteDistribution({
	id
}) {

	return xFetch(`${config.shopapi.url}/distribution/${id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			"app_id": `${config.shopapi.appid}`
		}
	})
}