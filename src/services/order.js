import xFetch from './xFetch';
import config from './config';


//获取订单列表
export async function getOrders({
	page_index,
	page_size
}) {
	return xFetch(`${config.shopapi.url}/admin/orders?page_index=${page_index}&page_size=${page_size}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			"app_id": `${config.shopapi.appid}`
		}
	})
}