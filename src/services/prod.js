import xFetch from './xFetch';
import config from './config';

//获取商品
export async function getProducts({page_index,page_size,merchant_id,flags,keyword}) {

	return xFetch(`${config.shopapi.url}/products/?keyword=${keyword}&merchant_id=${merchant_id}&page_index=${page_index}&page_size=${page_size}&flags=${flags}&order_by=create_time`,{method:'GET',headers:{
		'Content-Type': 'application/json',
		"app_id":`${config.shopapi.appid}`
	}})
}

//获取商品图片
export async function getProductImgs({prod_id}) {
	return xFetch(`${config.shopapi.url}/product/${prod_id}/imgs`,{method:'GET',headers:{
		'Content-Type': 'application/json',
		"app_id":`${config.shopapi.appid}`
	}})
}

//添加商品
export async function addProducts(product) {

	return xFetch(`${config.shopapi.url}/products/${product.merchant_id}`,{method:'POST',headers:{
		'Content-Type': 'application/json',
		"app_id":`${config.shopapi.appid}`
	},body:JSON.stringify(product)})
}


// 获取商品详情
export async function getProductDetail(prodId) {
	return xFetch(`${config.shopapi.url}/product/${prodId}/detail`,{method:'GET',headers:{
		'Content-Type': 'application/json',
		"app_id":`${config.shopapi.appid}`
	}})
}

//改变商品状态 0.下架 1.上架
export async function changeProductStatus(status,prodId) {
	return xFetch(`${config.shopapi.url}/product/${prodId}/status/${status}`,{method:'PUT',headers:{
		'Content-Type': 'application/json',
		"app_id":`${config.shopapi.appid}`
	}})
}

//添加商品SKU
export async function addProductSku(sku) {
	return xFetch(`${config.shopapi.url}/skus/product/${sku.prod_id}`,{method:'POST',headers:{
		'Content-Type': 'application/json',
		"app_id":`${config.shopapi.appid}`
	},body:JSON.stringify(sku)})
}

//商品推荐
export async function changeProductRecom({is_recom,prod_id}) {
	return xFetch(`${config.shopapi.url}/product/${prod_id}/recom/${is_recom}`,{method:'PUT',headers:{
		'Content-Type': 'application/json',
		"app_id":`${config.shopapi.appid}`
	}})
}




