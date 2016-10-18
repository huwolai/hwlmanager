import xFetch from './xFetch';
import config from './config';
export async function searchMerchants({
    page_index,
    page_size
}) {
    return xFetch(`${config.shopapi.url}/admin/merchants?order_by=create_time&page_index=${page_index}&page_size=${page_size}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "app_id": `${config.shopapi.appid}`
        }
    })
}

//获取商户详情
export async function getMerchantDetail({
    merchant_id
}) {
    return xFetch(`${config.shopapi.url}/merchant/${merchant_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "app_id": `${config.shopapi.appid}`
        }
    })
}

//获取商户图片
export async function getMerchantImgs({
    merchant_id
}) {
    return xFetch(`${config.shopapi.url}/merchant/${merchant_id}/imgs`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "app_id": `${config.shopapi.appid}`
        }
    })
}

//审核商户
export async function auditMerchant({
    merchant_id
}) {
    return xFetch(`${config.shopapi.url}/merchant/${merchant_id}/audit`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "app_id": `${config.shopapi.appid}`
        }
    })
}